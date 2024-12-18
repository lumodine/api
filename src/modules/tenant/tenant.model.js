const { mongoose } = require('@lumodine/mongodb');
const baseModel = require('../common/mongodb.base.model');
const { USER_ROLES } = require('../user/user.constant');
const { COLORS, SOCIAL_MEDIAS, TENANT_STATUS, HEADER_POSITIONS } = require('./tenant.constant');

const schema = new mongoose.Schema({
    users: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'user',
                required: true,
            },
            role: {
                type: String,
                required: true,
                enum: Object.values(USER_ROLES),
                default: USER_ROLES.TENANT_ADMIN,
            },
        },
    ],
    alias: {
        type: String,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
    },
    logo: {
        type: String,
    },
    background: {
        type: String,
    },
    theme: {
        color: {
            type: String,
            enum: Object.values(COLORS),
            default: COLORS.ZINC,
        },
        headerPosition: {
            type: String,
            enum: Object.values(HEADER_POSITIONS),
            default: HEADER_POSITIONS.BOTTOM,
        },
    },
    qrCode: {
        type: String,
        required: true,
    },
    address: {
        type: String,
    },
    languages: [
        {
            language: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'language',
                required: true,
            },
            isDefault: {
                type: Boolean,
                default: false,
            }
        },
    ],
    currencies: [
        {
            currency: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'currency',
                required: true,
            },
            isDefault: {
                type: Boolean,
                default: false,
            }
        },
    ],
    socialMedias: [
        {
            type: {
                type: String,
                enum: Object.values(SOCIAL_MEDIAS),
            },
            value: {
                type: String,
            },
        },
    ],
    status: {
        type: String,
        required: true,
        enum: Object.values(TENANT_STATUS),
        default: TENANT_STATUS.PUBLISHED,
    },
    ...baseModel.fields,
}, { ...baseModel.options });

module.exports = mongoose.model('tenant', schema);
