const { mongoose } = require('@lumodine/mongodb');
const baseModel = require('../common/mongodb.base.model');
const Item = require('../item/item.model');

const schema = new mongoose.Schema({
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
    ...baseModel.fields,
}, { ...baseModel.options });

module.exports = Item.discriminator('product-variant', schema);
