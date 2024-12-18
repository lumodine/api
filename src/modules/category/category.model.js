const { mongoose } = require('@lumodine/mongodb');
const baseModel = require('../common/mongodb.base.model');
const { CATEGORY_STATUS, CATEGORY_TYPES } = require('./category.constant');
const Item = require('../item/item.model');

const schema = new mongoose.Schema({
    image: {
        type: String,
    },
    parentCategory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'category',
    },
    type: {
        type: String,
        required: true,
        enum: Object.values(CATEGORY_TYPES),
        default: CATEGORY_TYPES.ROW_1_COL_2,
    },
    status: {
        type: String,
        required: true,
        enum: Object.values(CATEGORY_STATUS),
        default: CATEGORY_STATUS.PUBLISHED,
    },
    ...baseModel.fields,
}, { ...baseModel.options });

module.exports = Item.discriminator('category', schema);
