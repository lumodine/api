const { mongoose } = require('@lumodine/mongodb');
const baseModel = require('../common/base.model');
const { PRODUCT_STATUS, PRODUCT_TYPES } = require('./product.constant');

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
        },
    ],
    image: {
        type: String,
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'category',
        required: true,
    },
    prices: [
        {
            currency: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'currency',
            },
            amount: {
                type: Number,
            },
        },
    ],
    type: {
        type: String,
        required: true,
        enum: Object.values(PRODUCT_TYPES),
        default: PRODUCT_TYPES.ROW,
    },
    status: {
        type: String,
        required: true,
        enum: Object.values(PRODUCT_STATUS),
        default: PRODUCT_STATUS.PUBLISHED,
    },
    sort: {
        type: Number,
        default: 1,
    },
    ...baseModel.fields,
}, { ...baseModel.options });

module.exports = mongoose.model('product', schema);
