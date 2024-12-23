const { mongoose } = require('@lumodine/mongodb');
const baseModel = require('../common/mongodb.base.model');
const { EVENT_TYPES } = require('./event.constant');

const schema = new mongoose.Schema({
    tenant: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "tenant",
    },
    type: {
        type: String,
        required: true,
        enum: Object.values(EVENT_TYPES),
    },
    payload: {
        type: Object,
    },
    ...baseModel.fields,
}, { ...baseModel.options });

module.exports = mongoose.model('event', schema);
