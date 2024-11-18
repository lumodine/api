const crypto = require('crypto');

const random = (size = 64) => crypto.randomBytes(size).toString('hex');

module.exports = {
    random,
};
