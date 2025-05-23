const userModel = require('../models/user.model');
const userService = require('../services/user.services');
const { validationResult } = require('express-validator');
const blacklistedToken = require('../models/blacklistToken.model');
//user register
module.exports.userRegister = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    
    try {
        const { fullname, email, password } = req.body;
        const isUserAlready = await userModel.findOne({ email });
        if (isUserAlready) {
            return res.status(400).json({ 
                errors: [{
                    msg: "Email already exists",
                    param: "email",
                    location: "body"
                }]
            });
        }
        const hashedPassword = await userModel.hashPassword(password);

        const user = await userService.createUser({
            firstname: fullname.firstname, 
            lastname: fullname.lastname, 
            email, 
            password: hashedPassword    
        });

        const token = user.generateAuthToken();
        res.status(201).json({token, user});
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({ 
                errors: [{
                    msg: "Email already exists",
                    param: "email",
                    location: "body"
                }]
            });
        }
        next(error);
    }
}

//user login
module.exports.userLogin = async (req, res,next) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    const user = await userModel.findOne({ email }).select('+password');
    if (!user) {
        return res.status(401).json({ message: 'Invalid Email' });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
        return res.status(401).json({ message: 'Invalid Password' });
    }
    const token = user.generateAuthToken();
    res.cookie('token',token);
    res.status(200).json({ token, user });
}

module.exports.userProfile = async (req, res,next) => {
    // res.send('Profile');
    console.log(req.user);
    res.status(200).json(req.user);
}

module.exports.userLogout = async (req, res, next) => {
    res.clearCookie('token');
    const token = req.cookies.token || req.headers.authorization.split(' ')[1];
    await blacklistedToken.create({ token });
    res.clearCookie('token');
    res.status(200).json({ message: 'Logout Success' });
}