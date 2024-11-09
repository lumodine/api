const { mongoose } = require('@lumodine/mongodb');
const baseModel = require('../common/base.model');

const schema = new mongoose.Schema({
    users: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user',
            required: true,
        },
    ],
    alias: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    logo: {
        type: String,
    },
    background: {
        type: String,
    },
    address: {
        type: String,
        required: true,
    },
    defaultLanguage: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'language',
        required: true,
        autopopulate: true,
    },
    languages: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'language',
            required: true,
        },
    ],
    defaultCurrency: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'currency',
        required: true,
        autopopulate: true,
    },
    currencies: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'currency',
            required: true,
        },
    ],
    ...baseModel.fields,
}, { ...baseModel.options });

module.exports = mongoose.model('tenant', schema);
