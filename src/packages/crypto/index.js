const bcrypt = require('bcrypt');
const crypto = require('crypto');

const create = async (text, saltRound) => {
    const salt = await bcrypt.genSalt(parseInt(saltRound));
    return await bcrypt.hash(text, salt);
};

const compare = async (text, hash) => await bcrypt.compare(text, hash);

const random = (size = 64) => crypto.randomBytes(size).toString('hex');

module.exports = {
    create,
    compare,
    random,
};
