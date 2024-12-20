const { mongoose } = require('@lumodine/mongodb');
const baseModel = require('../common/mongodb.base.model');
const { ITEM_STATUS } = require('./item.constant');
const { THEME_TYPES } = require('../theme/theme.constant');

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
    isShowInMenu: {
        type: Boolean,
        default: true,
    },
    parentItems: [
        {
            item: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'item',
                required: true,
            },
            sort: {
                type: Number,
                default: 1,
            },
        },
    ],
    sort: {
        type: Number,
        default: 1,
    },
    status: {
        type: String,
        required: true,
        enum: Object.values(ITEM_STATUS),
        default: ITEM_STATUS.PUBLISHED,
    },
    type: {
        type: String,
        required: true,
        enum: Object.values(THEME_TYPES),
        default: THEME_TYPES.DEFAULT,
    },
    ...baseModel.fields,
}, {
    ...baseModel.options,
    discriminatorKey: 'kind',
    collection: 'items',
});

module.exports = mongoose.model('item', schema);
