const mongoose = require('mongoose');
const baseModel = require('./base.model');

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
    symbol: {
        type: String,
        required: true,
        unique: true,
    },
    ...baseModel.fields
}, { ...baseModel.options });

module.exports = mongoose.model('currency', schema);
