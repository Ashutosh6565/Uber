const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    fullname:{
        firstname:{
            type: String,
            required: true,
            min: [3, 'Too few characters atleast 3 characters'],
        },
        lastname:{
            type: String,
            min: [3, 'Too few characters atleast 3 characters'],
        }
    },
    email: {
        type: String,
        required: true,
        unique: true,
        min: [6, 'Too few characters atleast 6 characters'],
    },
    password: {
        type: String,
        required: true,
    },
    socketID: {
        type: String,
    },

});
