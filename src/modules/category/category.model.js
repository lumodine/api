const { mongoose } = require('@lumodine/mongodb');
const baseModel = require('../common/mongodb.base.model');
const { CATEGORY_TYPES } = require('./category.constant');
const Item = require('../item/item.model');

const schema = new mongoose.Schema({
    image: {
        type: String,
    },
    type: {
        type: String,
        required: true,
        enum: Object.values(CATEGORY_TYPES),
        default: CATEGORY_TYPES.ROW_1_COL_2,
    },
    ...baseModel.fields,
}, { ...baseModel.options });

module.exports = Item.discriminator('category', schema);
