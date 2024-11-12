const productController = require('./product.controller');
const { PERMISSIONS } = require('../user/user.constant');
const {
    createProductSchema,
    updateProductSchema,
    deleteProductSchema,
    getByIdProductSchema,
    getAllProductsSchema,
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
        '/:id',
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
        '/:id',
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
        '/:id',
        {
            ...getByIdProductSchema,
            preHandler: [
                fastify.checkTenantIdByParams,
            ],
        },
        productController.getById
    );

    done();
};
