const { PERMISSIONS } = require('../user/user.constant');
const createTenant = require('./createTenant');
const getAllTenants = require('./getAllTenants');
const updateTenantSettings = require('./updateTenantSettings');
const updateTenantLanguageSettings = require('./updateTenantLanguageSettings');
const updateTenantCurrencySettings = require('./updateTenantCurrencySettings');
const updateTenantThemeColor = require('./updateTenantThemeColor');
const removeTenant = require('./removeTenant');
const getTenantById = require('./getTenantById');
const getTenantByAlias = require('./getTenantByAlias');
const uploadTenantLogo = require('./uploadTenantLogo');
const uploadTenantBackground = require('./uploadTenantBackground');
const removeTenantLogo = require('./removeTenantLogo');
const removeTenantBackground = require('./removeTenantBackground');
const updateTenantSocialMedia = require('./updateTenantSocialMedia');

module.exports = (fastify, opts, done) => {
    fastify.post(
        '/',
        {
            preHandler: [
                fastify.authenticate,
                fastify.authorize(PERMISSIONS.CREATE_TENANT),
            ],
        },
        createTenant
    );

    fastify.get(
        '/',
        {
            preHandler: [
                fastify.authenticate,
                fastify.authorize(PERMISSIONS.GET_ALL_TENANTS),
            ],
        },
        getAllTenants
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
        updateTenantSettings
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
        updateTenantLanguageSettings
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
        updateTenantCurrencySettings
    );

    fastify.put(
        '/:tenantId/theme/color',
        {
            preHandler: [
                fastify.authenticate,
                fastify.authorize(PERMISSIONS.UPDATE_TENANT),
                fastify.checkTenantByParams,
            ],
        },
        updateTenantThemeColor
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
        removeTenant
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
        getTenantById
    );

    fastify.get(
        '/:tenantId/alias',
        {
            preHandler: [
                fastify.checkTenantByParams,
            ],
        },
        getTenantByAlias
    );

    fastify.post(
        '/:tenantId/upload/logo',
        {
            preHandler: [
                fastify.authenticate,
                fastify.authorize(PERMISSIONS.UPDATE_TENANT),
                fastify.checkTenantByParams,
            ],
        },
        uploadTenantLogo
    );

    fastify.post(
        '/:tenantId/upload/background',
        {
            preHandler: [
                fastify.authenticate,
                fastify.authorize(PERMISSIONS.UPDATE_TENANT),
                fastify.checkTenantByParams,
            ],
        },
        uploadTenantBackground
    );

    fastify.delete(
        '/:tenantId/upload/logo',
        {
            preHandler: [
                fastify.authenticate,
                fastify.authorize(PERMISSIONS.UPDATE_TENANT),
                fastify.checkTenantByParams,
            ],
        },
        removeTenantLogo
    );

    fastify.delete(
        '/:tenantId/upload/background',
        {
            preHandler: [
                fastify.authenticate,
                fastify.authorize(PERMISSIONS.UPDATE_TENANT),
                fastify.checkTenantByParams,
            ],
        },
        removeTenantBackground
    );

    fastify.put(
        '/:tenantId/social-media',
        {
            preHandler: [
                fastify.authenticate,
                fastify.authorize(PERMISSIONS.UPDATE_TENANT),
                fastify.checkTenantByParams,
            ],
        },
        updateTenantSocialMedia
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

    fastify.register(
        require('../tag'),
        {
            prefix: '/:tenantId',
        },
    );

    fastify.register(
        require('../item'),
        {
            prefix: '/:tenantId',
        },
    );

    done();
};
