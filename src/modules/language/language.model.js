const { mongoose } = require('@lumodine/mongodb');
const baseModel = require('../common/base.model');
const { LANGUAGE_DIRECTIONS } = require('./language.constant');

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    shortName: {
        type: String,
        required: true,
    },
    culture: {
        type: String,
        required: true,
        unique: true,
    },
    direction: {
        type: String,
        required: true,
        enum: Object.values(LANGUAGE_DIRECTIONS),
        default: LANGUAGE_DIRECTIONS.LTR,
    },
    ...baseModel.fields,
}, { ...baseModel.options });

module.exports = mongoose.model('language', schema);
