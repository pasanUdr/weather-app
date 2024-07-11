const mongoose = require('mongoose');

const weatherSchema = new mongoose.Schema({
    date: { type: Date, default: Date.now },
    data: Object
});

//Schema for the mongo DB collection
const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    location: { type: String, required: true },
    weatherData: [weatherSchema]
});

const User = mongoose.model('User', userSchema);
module.exports = User;