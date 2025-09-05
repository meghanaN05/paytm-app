const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO);

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    }

});

const User = mongoose.model('User', userSchema);

const bankSchema = new mongoose.Schema({
    UserId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },

    balance: {
        type: Number,
        required: true
    }
})

const Bank = mongoose.model('Bank', bankSchema);

module.exports = { User, Bank };

