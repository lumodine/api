const mongoose = require('mongoose');
const baseModel = require('./base.model');

const schema = new mongoose.Schema({
    tenant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'tenant',
        required: true,
        autopopulate: true,
    },
    translations: [
        {
            language: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'language',
                required: true,
                autopopulate: true,
            },
            name: {
                type: String,
                required: true,
            },
            description: {
                type: String,
            },
        },
    ],
    image: {
        type: String,
    },
    categories: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'category',
            required: true,
            autopopulate: true,
        },
    ],
    prices: [
        {
            currency: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'currency',
                required: true,
                autopopulate: true,
            },
            unit: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'unit',
                required: true,
                autopopulate: true,
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

schema.plugin(require('mongoose-autopopulate'));

module.exports = mongoose.model('product', schema);
