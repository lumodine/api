const { mongoose } = require('@lumodine/mongodb');
const baseModel = require('../common/mongodb.base.model');

const schema = new mongoose.Schema({
    sourceItem: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'item',
        required: true,
    },
    targetItem: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'item',
        required: true,
    },
    ...baseModel.fields,
}, {
    ...baseModel.options,
});

module.exports = mongoose.model('item-relation', schema);
