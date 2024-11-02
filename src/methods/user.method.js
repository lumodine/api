const crypto = require('../utils/crypto.util');

module.exports = {
    comparePassword: async function (password) {
        const user = this;

        return await await crypto.compare(password, user.password);
    },
};
