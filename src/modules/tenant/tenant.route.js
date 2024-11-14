const tenantController = require('./tenant.controller');
const { PERMISSIONS } = require('../user/user.constant');
const {
    createTenantSchema,
    updateTenantSchema,
    deleteTenantSchema,
    getByIdTenantSchema,
    getAllTenantsSchema,
    getMenusTenantSchema,
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
        '/:tenantId',
        {
            ...updateTenantSchema,
            preHandler: [
                fastify.authenticate,
                fastify.authorize(PERMISSIONS.UPDATE_TENANT),
                fastify.checkTenantIdByParams,
            ],
        },
        tenantController.update
    );

    fastify.delete(
        '/:tenantId',
        {
            ...deleteTenantSchema,
            preHandler: [
                fastify.authenticate,
                fastify.authorize(PERMISSIONS.DELETE_TENANT),
                fastify.checkTenantIdByParams,
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
                fastify.checkTenantIdByParams,
            ],
        },
        tenantController.getById
    );

    fastify.get(
        '/:tenantId/menus',
        {
            ...getMenusTenantSchema,
            preHandler: [
                fastify.authenticate,
                fastify.authorize(PERMISSIONS.GET_TENANT),
                fastify.checkTenantIdByParams,
            ],
        },
        tenantController.getMenus
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
