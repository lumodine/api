const { mongoose } = require('@lumodine/mongodb');
const baseModel = require('../common/base.model');

const schema = new mongoose.Schema({
    tenantId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'tenant',
        required: true,
    },
    translations: [
        {
            languageId: {
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
