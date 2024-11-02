const crypto = require('../utils/crypto.util');

module.exports = {
    save: async function (next) {
        const user = this;

        user.password = await crypto.create(user.password, process.env.CRYPTO_SALT_ROUNDS);

        return next();
    },
    findOneAndUpdate: async function (next) {
        const user = this._update;

        if (user.password) {
            user.password = await crypto.create(user.password, process.env.CRYPTO_SALT_ROUNDS);
        }

        return next();
    },
};
