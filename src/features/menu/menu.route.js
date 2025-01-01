const { PERMISSIONS } = require('../user/user.constant');
const createMenu = require('./createMenu');
const createSubMenu = require('./createSubMenu');

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

    fastify.post(
        '/:itemId',
        {
            preHandler: [
                fastify.authenticate,
                fastify.authorize(PERMISSIONS.MENU_CREATE),
                fastify.checkTenantByParams,
            ],
        },
        createSubMenu
    );

    done();
};
