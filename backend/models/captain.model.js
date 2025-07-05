const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const capitainSchema = new mongoose.Schema({
    fullname: {
        firstname: {
            type: String,
            required: true,
            minlength: [3, 'Too few characters atleast 3 characters'],
        },
        lastname: {
            type: String,
            minlength: [3, 'Too few characters atleast 3 characters'],
        }
    },
        email : {
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
        socketId: {
            type: String,
        },
        status: {
            type: String,
            enum: ['active', 'inactive'],
            default: 'inactive',
        },
        vehicle: {
            color: {
                type: String,
                required: true,
                minlength: [3, 'Too few characters atleast 3 characters'],
            },
            plate: {
                type: String,
                required: true,
                unique: true,
                minlength: [3, 'Too few characters atleast 3 characters'],
            },
            capacity: {
                type: Number,
                required: true,
                min: [1, 'Capacity must be atleast 1'],
            },
            vehicleType: {
                type: String,
                enum: ['car', 'bike', 'truck'],
                required: true,
            },
        },
        location: {
           ltd : {
            type: Number,
           },
           lng : {
            type : Number,
           }
        }
    })

capitainSchema.methods.generateAuthToken = function() {
    const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, { expiresIn: '24h' });
    return token;
}

capitainSchema.methods.comparePassword = async function(Password) {
    return await bcrypt.compare(Password, this.password);
}   

capitainSchema.statics.hashPassword = async function(Password) {
    return await bcrypt.hash(Password, 10);
}

capitainSchema.index({ location: "2dsphere" });

const capitainModel = mongoose.model('Capitain', capitainSchema);

module.exports = capitainModel;
