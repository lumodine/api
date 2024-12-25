const { PERMISSIONS } = require('../user/user.constant');
const getAllTranslatableContents = require('./getAllTranslatableContents');
const getAllTranslatableCurrencies = require('./getAllTranslatableCurrencies');

module.exports = (fastify, opts, done) => {
    fastify.get(
        '/translatable/contents',
        {
            preHandler: [
                fastify.authenticate,
                //fastify.authorize(PERMISSIONS.TENANT_UPDATE_SETTINGS),
                fastify.checkTenantByParams,
            ],
        },
        getAllTranslatableContents
    );

    fastify.get(
        '/translatable/currencies',
        {
            preHandler: [
                fastify.authenticate,
                //fastify.authorize(PERMISSIONS.TENANT_UPDATE_SETTINGS),
                fastify.checkTenantByParams,
            ],
        },
        getAllTranslatableCurrencies
    );

    done();
};
