const { mongoose } = require('@lumodine/mongodb');
const baseModel = require('../common/mongodb.base.model');
const { THEME_TYPES } = require('../theme/theme.constant');
const Item = require('../item/item.model');

const SubCategory = require('../subCategory/subCategory.model');

const schema = new mongoose.Schema({
    image: {
        type: String,
    },
    type: {
        type: String,
        required: true,
        enum: Object.values(THEME_TYPES),
        default: THEME_TYPES.DEFAULT,
    },
    ...baseModel.fields,
}, { ...baseModel.options });

module.exports = Item.discriminator('category', schema);
