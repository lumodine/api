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
    defaultLanguage: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'language',
    },
    languages: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'language',
        },
    ],
    defaultCurrency: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'currency',
    },
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
}, { timestamps: true, versionKey: false });

module.exports = mongoose.model('tenant', schema);
