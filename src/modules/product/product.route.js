const productController = require('./product.controller');
const { PERMISSIONS } = require('../user/user.constant');

module.exports = (fastify, opts, done) => {
    fastify.post(
        '/',
        {
            preHandler: [
                fastify.authenticate,
                fastify.authorize(PERMISSIONS.CREATE_PRODUCT),
                fastify.checkTenantByParams,
            ],
        },
        productController.create
    );

    fastify.get(
        '/',
        {
            preHandler: [
                fastify.authenticate,
                fastify.authorize(PERMISSIONS.GET_ALL_PRODUCTS),
                fastify.checkTenantByParams,
            ],
        },
        productController.getAll
    );

    fastify.put(
        '/:productId',
        {
            preHandler: [
                fastify.authenticate,
                fastify.authorize(PERMISSIONS.UPDATE_PRODUCT),
                fastify.checkTenantByParams,
            ],
        },
        productController.update
    );

    fastify.delete(
        '/:productId',
        {
            preHandler: [
                fastify.authenticate,
                fastify.authorize(PERMISSIONS.DELETE_PRODUCT),
                fastify.checkTenantByParams,
            ],
        },
        productController.remove
    );

    fastify.get(
        '/:productId',
        {
            preHandler: [
                fastify.authenticate,
                fastify.authorize(PERMISSIONS.GET_PRODUCT),
                fastify.checkTenantByParams,
            ],
        },
        productController.getById
    );

    fastify.put(
        '/sort',
        {
            preHandler: [
                fastify.authenticate,
                fastify.authorize(PERMISSIONS.UPDATE_CATEGORY),
                fastify.checkTenantByParams,
            ],
        },
        productController.updateSort,
    );

    fastify.put(
        '/:productId/status',
        {
            preHandler: [
                fastify.authenticate,
                fastify.authorize(PERMISSIONS.UPDATE_CATEGORY),
                fastify.checkTenantByParams,
            ],
        },
        productController.updateStatus,
    );

    fastify.put(
        '/:productId/type',
        {
            preHandler: [
                fastify.authenticate,
                fastify.authorize(PERMISSIONS.UPDATE_CATEGORY),
                fastify.checkTenantByParams,
            ],
        },
        productController.updateType,
    );

    done();
};
