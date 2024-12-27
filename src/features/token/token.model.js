const { mongoose } = require('@lumodine/mongodb');
const crypto = require('@lumodine/crypto');
const { TOKEN_TYPES } = require('./token.constant');

const schema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'user',
    },
    data: {
        type: String,
        default: crypto.random(),
    },
    type: {
        type: String,
        required: true,
        enum: Object.values(TOKEN_TYPES),
    },
}, { versionKey: false });

module.exports = mongoose.model('token', schema);
