const { mongoose } = require('@lumodine/mongodb');
const baseModel = require('../common/base.model');
const { CATEGORY_STATUS, CATEGORY_TYPES } = require('./category.constant');

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
            description: {
                type: String,
            },
        },
    ],
    image: {
        type: String,
    },
    parentCategory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'category',
    },
    type: {
        type: String,
        required: true,
        enum: Object.values(CATEGORY_TYPES),
        default: CATEGORY_TYPES.ROW,
    },
    status: {
        type: String,
        required: true,
        enum: Object.values(CATEGORY_STATUS),
        default: CATEGORY_STATUS.PUBLISHED,
    },
    sort: {
        type: Number,
        default: 1,
    },
    ...baseModel.fields,
}, { ...baseModel.options });

module.exports = mongoose.model('category', schema);
