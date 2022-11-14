const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Number,  default: 0 },
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);