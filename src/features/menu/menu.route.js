const { PERMISSIONS } = require('../user/user.constant');
const createMenu = require('./createMenu');

module.exports = (fastify, opts, done) => {
    fastify.post(
        '/',
        {
            preHandler: [
                fastify.authenticate,
                fastify.authorize(PERMISSIONS.MENU_CREATE),
                fastify.checkTenantByParams,
            ],
        },
        createMenu
    );

    done();
};
