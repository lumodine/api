const { mongoose } = require('@lumodine/mongodb');
const baseModel = require('../common/mongodb.base.model');
const { ITEM_KINDS } = require('../item/item.constant');

const schema = new mongoose.Schema({
    source: {
        item: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'item',
            required: true,
        },
        kind: {
            type: String,
            required: true,
            enum: Object.values(ITEM_KINDS),
        },
    },
    target: {
        item: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'item',
            required: true,
        },
        kind: {
            type: String,
            required: true,
            enum: Object.values(ITEM_KINDS),
        },
    },
    ...baseModel.fields,
}, {
    ...baseModel.options,
});

module.exports = mongoose.model('item-relation', schema);
