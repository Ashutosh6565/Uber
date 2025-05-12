const express = require('express');
const router = express.Router();
const {body} = require('express-validator');

router.post('/create', 
    body('userId').isString().isLength({min:24, max:24}).notEmpty().withMessage('User ID is required'),
    body('pickup').isString().isLength({min:3}).withMessage('Pickup location is required'),
    body('destination').isString().isLength({min:3}).withMessage('Destination location is required'),
)