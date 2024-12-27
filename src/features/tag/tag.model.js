const { mongoose } = require('@lumodine/mongodb');
const baseModel = require('../common/mongodb.base.model');
const Item = require('../item/item.model');
const { COLORS } = require('../theme/theme.constant');

const schema = new mongoose.Schema({
    theme: {
        color: {
            type: String,
            enum: Object.values(COLORS),
            default: COLORS.ZINC,
        },
    },
    ...baseModel.fields,
}, { ...baseModel.options });

module.exports = Item.discriminator('tag', schema);
