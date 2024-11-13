const productController = require('./product.controller');
const { PERMISSIONS } = require('../user/user.constant');
const {
    createProductSchema,
    updateProductSchema,
    deleteProductSchema,
    getByIdProductSchema,
    getAllProductsSchema,
    updateProductSortSchema,
    updateProductStatusSchema,
} = require('./product.schema');

module.exports = (fastify, opts, done) => {
    fastify.post(
        '/',
        {
            ...createProductSchema,
            preHandler: [
                fastify.authenticate,
                fastify.authorize(PERMISSIONS.CREATE_PRODUCT),
                fastify.checkTenantIdByParams,
            ],
        },
        productController.create
    );

    fastify.get(
        '/',
        {
            ...getAllProductsSchema,
            preHandler: [
                fastify.checkTenantIdByParams,
            ],
        },
        productController.getAll
    );

    fastify.put(
        '/:productId',
        {
            ...updateProductSchema,
            preHandler: [
                fastify.authenticate,
                fastify.authorize(PERMISSIONS.UPDATE_PRODUCT),
                fastify.checkTenantIdByParams,
            ],
        },
        productController.update
    );

    fastify.delete(
        '/:productId',
        {
            ...deleteProductSchema,
            preHandler: [
                fastify.authenticate,
                fastify.authorize(PERMISSIONS.DELETE_PRODUCT),
                fastify.checkTenantIdByParams,
            ],
        },
        productController.remove
    );

    fastify.get(
        '/:productId',
        {
            ...getByIdProductSchema,
            preHandler: [
                fastify.checkTenantIdByParams,
            ],
        },
        productController.getById
    );

    fastify.put(
        '/sort',
        {
            ...updateProductSortSchema,
            preHandler: [
                fastify.authenticate,
                fastify.authorize(PERMISSIONS.UPDATE_CATEGORY),
                fastify.checkTenantIdByParams,
            ],
        },
        productController.updateSort,
    );

    fastify.put(
        '/:productId/status',
        {
            ...updateProductStatusSchema,
            preHandler: [
                fastify.authenticate,
                fastify.authorize(PERMISSIONS.UPDATE_CATEGORY),
                fastify.checkTenantIdByParams,
            ],
        },
        productController.updateStatus,
    );

    done();
};
