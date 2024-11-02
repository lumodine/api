const { mongoose } = require('@lumodine/mongodb');
const baseModel = require('../common/base.model');

const schema = new mongoose.Schema({
    tenant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'tenant',
        required: true,
        autopopulate: true,
    },
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
        },
    ],
    ...baseModel.fields,
}, { ...baseModel.options });

schema.plugin(require('mongoose-autopopulate'));

module.exports = mongoose.model('unit', schema);
