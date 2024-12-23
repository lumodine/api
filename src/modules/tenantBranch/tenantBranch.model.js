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
            title: {
                type: String,
                required: true,
            },
            description: {
                type: String,
            },
        },
    ],
    address: {
        type: String,
        required: true,
    },
    coordinates: {
        lat: {
            type: Number,
            required: true,
        },
        lng: {
            type: Number,
            required: true,
        },
    },
    ...baseModel.fields,
}, { ...baseModel.options });

module.exports = mongoose.model('tenantBranch', schema);
