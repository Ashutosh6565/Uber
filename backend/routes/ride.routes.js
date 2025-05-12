const express = require('express');
const router = express.Router();
const {body} = require('express-validator');
const rideController = require('../controllers/ride.controllers');
const authMiddleware = require('../middlewares/auth.middleware.js');
router.post('/create', 
   authMiddleware.authUser,
    body('pickup').isString().isLength({min:3}).withMessage('Pickup location is required'),
    body('destination').isString().isLength({min:3}).withMessage('Destination location is required'),
    body('vehicleType').isString().isIn(['auto', 'car', 'motorcycle']).withMessage('Vehicle type is required'),
    rideController.createRide
)

module.exports = router;