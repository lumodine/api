const { mongoose } = require('@lumodine/mongodb');
const baseModel = require('../common/mongodb.base.model');
const Item = require('../item/item.model');
const { COLORS } = require('../theme/theme.constant');

const schema = new mongoose.Schema({
    ...baseModel.fields,
    theme: {
        color: {
            type: String,
            enum: Object.values(COLORS),
            default: COLORS.ZINC,
        },
    },
}, { ...baseModel.options });

module.exports = Item.discriminator('tag', schema);
