const captainController = require('../controllers/captain.controllers.js');
const express = require('express');
const { body } = require('express-validator');
const router = express.Router();

router.post('/register',[
    body('email').isEmail().withMessage('Invalid Email'),
    body('fullname.firstname').isLength({ min: 3 }).withMessage('First Name must be atleast 3 characters'),
    // body('fullname.lastname').isLength({ min: 3 }).withMessage('Last Name must be atleast 3 characters'),
    body('password').isLength({ min: 6 }).withMessage('Password must be atleast 6 characters'),
    body('vehicle.color').isLength({ min: 3 }).withMessage('Color must be atleast 3 characters'),
    body('vehicle.plate').isLength({ min: 3 }).withMessage('Plate must be atleast 3 characters'),
    body('vehicle.capacity').isNumeric().withMessage('Capacity must be a number'),
    body('vehicle.vehicleType').isIn(['car', 'bike', 'truck']).withMessage('Vehicle Type must be either car, bike or truck'),
],
captainController.registerCaptain
)

module.exports = router;