const { mongoose } = require('@lumodine/mongodb');
const baseModel = require('../common/mongodb.base.model');
const userHook = require('./user.hook');
const userMethod = require('./user.method');

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
    ...baseModel.fields,
}, { ...baseModel.options });

schema.pre('save', userHook.save);
schema.pre('findOneAndUpdate', userHook.findOneAndUpdate);

schema.methods.comparePassword = userMethod.comparePassword;

module.exports = mongoose.model('user', schema);
