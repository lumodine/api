const mongoose = require('mongoose');

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
    isDeleted: {
        type: Boolean,
        default: false,
    },
    deletedAt: {
        type: Date,
    },
}, { timestamps: true });

module.exports = mongoose.model('currency', schema);
