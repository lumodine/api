const { mongoose } = require('@lumodine/mongodb');
const baseModel = require('../common/mongodb.base.model');
const { PRODUCT_TYPES } = require('./product.constant');
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
    ...baseModel.fields,
}, { ...baseModel.options });

module.exports = Item.discriminator('product', schema);
