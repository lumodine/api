const { mongoose } = require('@lumodine/mongodb');
const baseModel = require('../common/mongodb.base.model');
const { ANNOUNCEMENT_STATUS } = require('./announcement.constant');

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
    status: {
        type: String,
        required: true,
        enum: Object.values(ANNOUNCEMENT_STATUS),
        default: ANNOUNCEMENT_STATUS.PUBLISHED,
    },
    sort: {
        type: Number,
        default: 1,
    },
    ...baseModel.fields,
}, { ...baseModel.options });

module.exports = mongoose.model('announcement', schema);
