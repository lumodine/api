const { mongoose } = require('@lumodine/mongodb');
const baseModel = require('../common/mongodb.base.model');
const { PRODUCT_STATUS, PRODUCT_TYPES } = require('./product.constant');
const Item = require('../item/item.model');

const schema = new mongoose.Schema({
    image: {
        type: String,
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
    ...baseModel.fields,
}, { ...baseModel.options });

module.exports = Item.discriminator('product', schema);
