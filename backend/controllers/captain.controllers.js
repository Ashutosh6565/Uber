const capitainModel = require('../models/captain.model.js');
const captainService = require('../services/captain.service.js');
const {validationResult} = require('express-validator');
const blacklistTokenModel = require('../models/blacklistToken.model.js');



module.exports.registerCaptain = async (req, res) => {
const errors = validationResult(req);
if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });

}

const {fullname, email, password, vehicle} = req.body;

const isCaptainAleradyExist = await capitainModel.findOne({email});
if (isCaptainAleradyExist) {
    return res.status(400).json({ 
        errors: [{
            msg: "Captain already exists",
            param: "email",
            location: "body"
        }]
    });
}

const hashedPassword = await capitainModel.hashPassword(password);
const captain = await captainService.createCaptain({
    firstname: fullname.firstname,
    lastname: fullname.lastname,
    email,
    password: hashedPassword,
    color: vehicle.color,
    plate: vehicle.plate,
    capacity: vehicle.capacity,
    vehicleType: vehicle.vehicleType
});
const token = captain.generateAuthToken();
res.status(201).json({token, captain});
}

module.exports.loginCaptain = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    const captain = await capitainModel.findOne({ email }).select('+password');
    if (!captain) {
        return res.status(401).json({ message: 'Invalid Email' });
    }
    const isMatch = await captain.comparePassword(password);
    if (!isMatch) {
        return res.status(401).json({ message: 'Invalid Password' });
    }
    const token = captain.generateAuthToken();
    res.cookie('token', token);
    res.status(200).json({ token, captain });
}

module.exports.getCaptainProfile = async (req, res, next) => {
    // console.log(req.captain);
    res.status(200).json({ captain: req.captain });
}

module.exports.logoutCaptain = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];

    await blacklistTokenModel.create({ token });
    res.clearCookie('token');
    res.status(200).json({ message: 'Logged out successfully' });
}