const mongoose = require('mongoose');
const baseModel = require('./base.model');
const { USER_ROLES } = require('../constants');
const { userHook } = require('../hooks');
const { userMethod } = require('../methods');

const schema = new mongoose.Schema({
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
    },
    role: {
        type: String,
        required: true,
        enum: Object.values(USER_ROLES),
        default: USER_ROLES.TENANT_ADMIN,
    },
    tenants: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'tenant',
            required: true,
            autopopulate: true,
        }
    ],
    ...baseModel.fields,
}, { ...baseModel.options });

schema.pre('save', userHook.save);
schema.pre('findOneAndUpdate', userHook.findOneAndUpdate);

schema.methods.comparePassword = userMethod.comparePassword;

schema.plugin(require('mongoose-autopopulate'));

module.exports = mongoose.model('user', schema);
