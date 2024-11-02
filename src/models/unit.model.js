const mongoose = require('mongoose');
const baseModel = require('./base.model');

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
        },
    ],
    ...baseModel.fields,
}, { ...baseModel.options });

module.exports = mongoose.model('unit', schema);
