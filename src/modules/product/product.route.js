const productController = require('./product.controller');
const { PERMISSIONS } = require('../common/user.constant');
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
            ],
        },
        productController.create
    );

    fastify.get(
        '/',
        {
            ...getAllProductsSchema,
            preHandler: [
                fastify.authenticate,
                fastify.authorize(PERMISSIONS.GET_ALL_PRODUCTS),
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
            ],
        },
        productController.remove
    );

    fastify.get(
        '/:id',
        {
            ...getByIdProductSchema,
            preHandler: [
                fastify.authenticate,
                fastify.authorize(PERMISSIONS.GET_PRODUCT),
            ],
        },
        productController.getById
    );

    done();
};
