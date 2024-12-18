const { mongoose } = require('@lumodine/mongodb');
const baseModel = require('../common/mongodb.base.model');
const Item = require('../item/item.model');

const schema = new mongoose.Schema({
    ...baseModel.fields,
}, { ...baseModel.options });

module.exports = Item.discriminator('tag', schema);
