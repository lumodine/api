const { mongoose } = require('@lumodine/mongodb');
const baseModel = require('../common/base.model');

const schema = new mongoose.Schema({
    tenant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'tenant',
        required: true,
        autopopulate: true,
    },
    products: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'product',
        },
    ],
    translations: [
        {
            language: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'language',
                required: true,
                autopopulate: true,
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
    image: {
        type: String,
    },
    sort: {
        type: Number,
        default: 1,
    },
    ...baseModel.fields,
}, { ...baseModel.options });

module.exports = mongoose.model('category', schema);
