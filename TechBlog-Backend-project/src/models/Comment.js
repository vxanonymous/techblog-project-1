const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const comment = new Schema({
    author: String,
    content: String,
    date: {type: Date, default: Date.now}
});

module.exports = mongoose.model("Comment", comment);