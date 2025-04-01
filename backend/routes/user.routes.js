const express = require('express');
const router = express.Router();
const {body} = require('express-validator');
const userController = require('../controllers/user.controller');
const authMiddleware = require('../middlewares/auth.middleware');
router.post('/register', [

    body('email').isEmail().withMessage('Invalid Email'),
    body('fullname.firstname').isLength({min: 3}).withMessage('First Name must be atleast 3 characters'),
    body('password').isLength({min: 6}).withMessage('Password must be atleast 6 characters'),
], 
userController.userRegister
);

router.post('/login', [
    body('email').isEmail().withMessage('Invalid Email'),
    body('password').isLength({min: 6}).withMessage('Password must be atleast 6 characters'),
],
userController.userLogin
);

router.get('/profile', authMiddleware.authUser, userController.userProfile);

module.exports = router;
//this is the routes then we will use in the controller to get the data from the database and send it to the client.
//this is the routes then we will use in the controller to get the data from the database and send it to the client.