const mongoose = require('mongoose');
const { LANGUAGE_DIRECTIONS } = require('../constants');

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    shortName: {
        type: String,
        required: true,
        unique: true,
    },
    culture: {
        type: String,
        required: true,
        unique: true,
    },
    flag: {
        type: String,
        required: true,
    },
    direction: {
        type: String,
        required: true,
        enum: Object.values(LANGUAGE_DIRECTIONS),
        default: LANGUAGE_DIRECTIONS.LTR,
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
    deletedAt: {
        type: Date,
    },
}, { timestamps: true, versionKey: false });

module.exports = mongoose.model('language', schema);
