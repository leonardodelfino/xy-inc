'use strict';
const mongoose = require('mongoose');

let AttributeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    required: {
        type: Boolean,
        required: true,
        default: false
    },
    type: {
        type: String,
        enum: ["int", "integer", "float", "double", "number", "date", "datetime",
            "bool", "boolean", "string"],
        required: true
    }
}, { _id: false, versionKey: false });

let EntitySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
        unique: true
    },
    attributes: [AttributeSchema]
}, { versionKey: false, timestamps: true });

module.exports = mongoose.model('Entity', EntitySchema);