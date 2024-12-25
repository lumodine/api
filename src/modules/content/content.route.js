const { PERMISSIONS } = require('../user/user.constant');
const getAllTranslatableContents = require('./getAllTranslatableContents');
const getAllTranslatableCurrencies = require('./getAllTranslatableCurrencies');
const updateTranslateAllContents = require('./updateTranslateAllContents');
const updateAllAmounts = require('./updateAllAmounts');

module.exports = (fastify, opts, done) => {
    fastify.get(
        '/translatable/contents',
        {
            preHandler: [
                fastify.authenticate,
                fastify.authorize(PERMISSIONS.CONTENT_GET_ALL_TRANSLATABLE_CONTENTS),
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
                fastify.authorize(PERMISSIONS.CONTENT_GET_ALL_TRANSLATABLE_CURRENCIES),
                fastify.checkTenantByParams,
            ],
        },
        getAllTranslatableCurrencies
    );

    fastify.put(
        '/translatable/contents',
        {
            preHandler: [
                fastify.authenticate,
                fastify.authorize(PERMISSIONS.CONTENT_UPDATE_TRANSLATABLE_CONTENTS),
                fastify.checkTenantByParams,
            ],
        },
        updateTranslateAllContents
    );

    fastify.put(
        '/translatable/currencies',
        {
            preHandler: [
                fastify.authenticate,
                fastify.authorize(PERMISSIONS.CONTENT_UPDATE_TRANSLATABLE_CURRENCIES),
                fastify.checkTenantByParams,
            ],
        },
        updateAllAmounts
    );

    done();
};
