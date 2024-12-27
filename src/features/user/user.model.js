const { mongoose } = require('@lumodine/mongodb');
const baseModel = require('../common/mongodb.base.model');
const userHook = require('./user.hook');
const userMethod = require('./user.method');
const { USER_ROLES } = require('./user.constant');

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
        select: false,
    },
    role: {
        type: String,
        required: true,
        enum: Object.values(USER_ROLES),
        default: USER_ROLES.USER,
    },
    ...baseModel.fields,
}, { ...baseModel.options });

schema.pre('save', userHook.save);
schema.pre('findOneAndUpdate', userHook.findOneAndUpdate);

schema.methods.comparePassword = userMethod.comparePassword;

module.exports = mongoose.model('user', schema);
