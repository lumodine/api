const { mongoose } = require('@lumodine/mongodb');
const baseModel = require('../common/base.model');
const { USER_ROLES } = require('../user/user.constant');
const { THEMES } = require('./tenant.constant');

const schema = new mongoose.Schema({
    users: [
        {
            _id: {
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
        type: String,
        enum: Object.values(THEMES),
        default: THEMES.ZINC,
    },
    qrCodes: {
        small: {
            type: String,
            required: true,
        },
        medium: {
            type: String,
            required: true,
        },
        large: {
            type: String,
            required: true,
        },
        xlarge: {
            type: String,
            required: true,
        },
    },
    address: {
        type: String,
    },
    languages: [
        {
            _id: {
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
            _id: {
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
    ...baseModel.fields,
}, { ...baseModel.options });

module.exports = mongoose.model('tenant', schema);
