const tenantController = require('./tenant.controller');
const { PERMISSIONS } = require('../user/user.constant');

module.exports = (fastify, opts, done) => {
    fastify.post(
        '/',
        {
            preHandler: [
                fastify.authenticate,
                fastify.authorize(PERMISSIONS.CREATE_TENANT),
            ],
        },
        tenantController.create
    );

    fastify.get(
        '/',
        {
            preHandler: [
                fastify.authenticate,
                fastify.authorize(PERMISSIONS.GET_ALL_TENANTS),
            ],
        },
        tenantController.getAll
    );

    fastify.put(
        '/:tenantId/settings',
        {
            preHandler: [
                fastify.authenticate,
                fastify.authorize(PERMISSIONS.UPDATE_TENANT),
                fastify.checkTenantByParams,
            ],
        },
        tenantController.updateSettings
    );

    fastify.put(
        '/:tenantId/languages',
        {
            preHandler: [
                fastify.authenticate,
                fastify.authorize(PERMISSIONS.UPDATE_TENANT),
                fastify.checkTenantByParams,
            ],
        },
        tenantController.updateLanguageSettings
    );

    fastify.put(
        '/:tenantId/currencies',
        {
            preHandler: [
                fastify.authenticate,
                fastify.authorize(PERMISSIONS.UPDATE_TENANT),
                fastify.checkTenantByParams,
            ],
        },
        tenantController.updateCurrencySettings
    );

    fastify.put(
        '/:tenantId/theme',
        {
            preHandler: [
                fastify.authenticate,
                fastify.authorize(PERMISSIONS.UPDATE_TENANT),
                fastify.checkTenantByParams,
            ],
        },
        tenantController.updateTheme
    );

    fastify.delete(
        '/:tenantId',
        {
            preHandler: [
                fastify.authenticate,
                fastify.authorize(PERMISSIONS.DELETE_TENANT),
                fastify.checkTenantByParams,
            ],
        },
        tenantController.remove
    );

    fastify.get(
        '/:tenantId',
        {
            preHandler: [
                fastify.authenticate,
                fastify.authorize(PERMISSIONS.GET_TENANT),
                fastify.checkTenantByParams,
            ],
        },
        tenantController.getById
    );

    fastify.get(
        '/:tenantId/alias',
        {
            preHandler: [
                fastify.checkTenantByParams,
            ],
        },
        tenantController.getAliasById
    );

    fastify.get(
        '/themes',
        {
            preHandler: [
                fastify.authenticate,
                fastify.authorize(PERMISSIONS.GET_ALL_TENANTS),
            ],
        },
        tenantController.getAllThemes
    );

    fastify.register(
        require('../category'),
        {
            prefix: '/:tenantId',
        },
    );

    fastify.register(
        require('../user'),
        {
            prefix: '/:tenantId',
        },
    );

    done();
};
