const crypto = require('@lumodine/crypto');

module.exports = {
    comparePassword: async function (password) {
        const user = this;

        return await await crypto.compare(password, user.password);
    },
};
