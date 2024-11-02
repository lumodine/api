const { mongoose } = require('@lumodine/mongodb');
const baseModel = require('../common/base.model');

const schema = new mongoose.Schema({
    code: {
        type: String,
        required: true,
        unique: true,
    },
    number: {
        type: Number,
        required: true,
    },
    symbol: {
        type: String,
        required: true,
    },
    ...baseModel.fields,
}, { ...baseModel.options });

module.exports = mongoose.model('currency', schema);
