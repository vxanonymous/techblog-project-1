const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const user = new Schema({
    email: {type: String},
    password: String,
    username: String,
    role: String,
    date: {type: Date, default: Date.now}
});

const User = mongoose.model('User', user);
module.exports = User;