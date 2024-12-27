const bcrypt = require('@lumodine/bcrypt');

module.exports = {
    save: async function (next) {
        const user = this;

        user.password = await bcrypt.create(user.password, process.env.BCRYPT_SALT_ROUNDS);

        return next();
    },
    findOneAndUpdate: async function (next) {
        const user = this._update;

        if (user.password) {
            user.password = await bcrypt.create(user.password, process.env.BCRYPT_SALT_ROUNDS);
        }

        return next();
    },
};
