const { mongoose } = require('@lumodine/mongodb');
const baseModel = require('../common/mongodb.base.model');

const schema = new mongoose.Schema({
    tenant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'tenant',
        required: true,
    },
    translations: [
        {
            language: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'language',
                required: true,
            },
            name: {
                type: String,
                required: true,
            },
            description: {
                type: String,
            },
        },
    ],
    parentItem: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'item',
    },
    sort: {
        type: Number,
        default: 1,
    },
    ...baseModel.fields,
}, {
    ...baseModel.options,
    discriminatorKey: 'kind',
    collection: 'items',
});

module.exports = mongoose.model('item', schema);
