const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const collections = new Schema({
    name: String,
    blogs: [{blogId: String}],
    date: {type: Date, default: Date.now}
});

module.exports = mongoose.model("Collection", collections);