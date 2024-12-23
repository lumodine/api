const { PERMISSIONS } = require('../user/user.constant');
const getAllTenantColors = require('./getAllTenantColors');
const getAllTenantFonts = require('./getAllTenantFonts');

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
    
    fastify.get(
        '/fonts',
        {
            preHandler: [
                fastify.authenticate,
                fastify.authorize(PERMISSIONS.THEME_GET_ALL_FONTS),
                fastify.checkTenantByParams,
            ],
        },
        getAllTenantFonts
    );

    done();
};
