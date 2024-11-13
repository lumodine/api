const { mongoose } = require('@lumodine/mongodb');
const baseModel = require('../common/base.model');
const { PRODUCT_STATUS } = require('./product.constant');

const schema = new mongoose.Schema({
    tenantId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'tenant',
        required: true,
    },
    translations: [
        {
            languageId: {
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
    categories: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'category',
            required: true,
        },
    ],
    prices: [
        {
            currencyId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'currency',
                required: true,
            },
            unitId: {
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
    status: {
        type: String,
        required: true,
        enum: Object.values(PRODUCT_STATUS),
        default: PRODUCT_STATUS.PUBLISHED,
    },
    ...baseModel.fields,
}, { ...baseModel.options });

module.exports = mongoose.model('product', schema);
