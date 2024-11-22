const tenantController = require('./tenant.controller');
const { PERMISSIONS } = require('../user/user.constant');
const {
    createTenantSchema,
    updateTenantSettingsSchema,
    deleteTenantSchema,
    getByIdTenantSchema,
    getAllTenantsSchema,
    getAliasByIdTenantSchema,
    updateTenantLanguageSettingsSchema,
    updateTenantCurrencySettingsSchema,
} = require('./tenant.schema');

module.exports = (fastify, opts, done) => {
    fastify.post(
        '/',
        {
            ...createTenantSchema,
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
            ...getAllTenantsSchema,
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
            ...updateTenantSettingsSchema,
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
            ...updateTenantLanguageSettingsSchema,
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
            ...updateTenantCurrencySettingsSchema,
            preHandler: [
                fastify.authenticate,
                fastify.authorize(PERMISSIONS.UPDATE_TENANT),
                fastify.checkTenantByParams,
            ],
        },
        tenantController.updateCurrencySettings
    );

    fastify.delete(
        '/:tenantId',
        {
            ...deleteTenantSchema,
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
            ...getByIdTenantSchema,
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
            ...getAliasByIdTenantSchema,
            preHandler: [
                fastify.checkTenantByParams,
            ],
        },
        tenantController.getAliasById
    );

    fastify.register(
        require('../category'),
        {
            prefix: '/:tenantId',
        },
    );

    fastify.register(
        require('../product'),
        {
            prefix: '/:tenantId',
        },
    );

    done();
};
