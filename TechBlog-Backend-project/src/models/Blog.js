const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const blog = new Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: ObjectId,
        required: true,
        ref: 'User'
    },
    content: {
        type: String,
        required: true
    },
    thumbnail: {
        type: String,
        required: true
    },
    tags: {
        type: Array,
        required: false
    },
    comments: {
        type: Array,
        required: false
    },
    status: {
        type: String,
        default: "PENDING" //PENDING | PUBLISH                  later: | DRAFT | DELETED
    },
    date: {
        type: Date, 
        default: Date.now
    }
});

module.exports = mongoose.model("Blog", blog);