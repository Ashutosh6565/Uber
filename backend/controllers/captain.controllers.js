const capitainModel = require('../models/captain.model.js');
const captainService = require('../services/captain.service.js');
const {validationResult} = require('express-validator');




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