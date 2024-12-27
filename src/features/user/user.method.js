const bcrypt = require('@lumodine/bcrypt');

module.exports = {
    comparePassword: async function (password) {
        const user = this;

        return await await bcrypt.compare(password, user.password);
    },
};
