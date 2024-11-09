const { mongoose } = require('@lumodine/mongodb');
const baseModel = require('../common/base.model');
const { USER_ROLES } = require('../user/user.constant');
const userHook = require('./user.hook');
const userMethod = require('./user.method');

const schema = new mongoose.Schema({
    tenants: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'tenant',
            required: true,
        },
    ],
    email: {
        type: String,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
    },
    surname: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
        select: false,
    },
    role: {
        type: String,
        required: true,
        enum: Object.values(USER_ROLES),
        default: USER_ROLES.TENANT_ADMIN,
    },
    ...baseModel.fields,
}, { ...baseModel.options });

schema.pre('save', userHook.save);
schema.pre('findOneAndUpdate', userHook.findOneAndUpdate);

schema.methods.comparePassword = userMethod.comparePassword;

module.exports = mongoose.model('user', schema);
