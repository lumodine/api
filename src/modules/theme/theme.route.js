const { PERMISSIONS } = require('../user/user.constant');
const getAllTenantColors = require('./getAllTenantColors');

module.exports = (fastify, opts, done) => {
    fastify.get(
        '/colors',
        {
            preHandler: [
                fastify.authenticate,
                fastify.authorize(PERMISSIONS.THEME_GET_ALL_COLORS),
                fastify.checkTenantByParams,
            ],
        },
        getAllTenantColors
    );

    done();
};
