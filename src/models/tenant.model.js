const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    logo: {
        type: String,
        required: true,
    },
    background: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    languages: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'language',
        },
    ],
    currencies: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'currency',
        },
    ],
    isDeleted: {
        type: Boolean,
        default: false,
    },
    deletedAt: {
        type: Date,
    },
}, { timestamps: true });

module.exports = mongoose.model('tenant', schema);
