const tenantController = require('./tenant.controller');
const { PERMISSIONS } = require('../common/user.constant');

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
        '/:id',
        {
            preHandler: [
                fastify.authenticate,
                fastify.authorize(PERMISSIONS.UPDATE_TENANT),
            ],
        },
        tenantController.update
    );

    fastify.delete(
        '/:id',
        {
            preHandler: [
                fastify.authenticate,
                fastify.authorize(PERMISSIONS.DELETE_TENANT),
            ],
        },
        tenantController.remove
    );

    fastify.get(
        '/:id',
        {
            preHandler: [
                fastify.authenticate,
                fastify.authorize(PERMISSIONS.GET_TENANT),
            ],
        },
        tenantController.getById
    );

    done();
};
