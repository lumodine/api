const mongoose = require('mongoose');
const baseModel = require('./base.model');

const schema = new mongoose.Schema({
    tenant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'tenant',
        required: true,
    },
    translations: [
        {
            language: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'language',
                required: true,
            },
            name: {
                type: String,
                required: true,
            },
            description: {
                type: String,
            },
            image: {
                type: String,
            },
        },
    ],
    categories: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'category',
            required: true,
        },
    ],
    prices: [
        {
            currency: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'currency',
                required: true,
            },
            unit: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'unit',
                required: true,
            },
            price: {
                type: Number,
                required: true,
            },
        },
    ],
    sort: {
        type: Number,
        default: 1,
    },
    ...baseModel.fields,
}, { ...baseModel.options });

module.exports = mongoose.model('product', schema);
