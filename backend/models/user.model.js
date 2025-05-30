const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const userSchema = new mongoose.Schema({
    fullname:{
        firstname:{
            type: String,
            required: true,
            minlength: [3, 'Too few characters atleast 3 characters'],
        },
        lastname:{
            type: String,
            minlength: [3, 'Too few characters atleast 3 characters'],
        }
    },
    email: {
        type: String,
        required: true,
        unique: true,
        minlength: [6, 'Too few characters atleast 6 characters'],
    },
    password: {
        type: String,
        required: true,
        select: false,
    },
    //changed socket id 
    socketId: {
        type: String,
    },

});

userSchema.methods.generateAuthToken = function() {
    const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, { expiresIn: '24h' });
    return token;
}

userSchema.methods.comparePassword = async function(Password) {
    return await bcrypt.compare(Password, this.password);
}

userSchema.statics.hashPassword = async function(Password) {
    return await bcrypt.hash(Password, 10);
}

const userModel = mongoose.model('User', userSchema);

module.exports = userModel;