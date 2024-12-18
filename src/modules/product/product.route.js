const { PERMISSIONS } = require('../user/user.constant');
const createProduct = require('./createProduct');
const updateProduct = require('./updateProduct');
const removeProduct = require('./removeProduct');
const getProductById = require('./getProductById');
const getAllProducts = require('./getAllProducts');
const updateProductSort = require('./updateProductSort');
const updateProductStatus = require('./updateProductStatus');
const updateProductType = require('./updateProductType');
const uploadProductImage = require('./uploadProductImage');
const removeProductImage = require('./removeProductImage');

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
        createProduct
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
        getAllProducts
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
        updateProduct
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
        removeProduct
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
        getProductById
    );

    fastify.put(
        '/sort',
        {
            preHandler: [
                fastify.authenticate,
                fastify.authorize(PERMISSIONS.UPDATE_PRODUCT),
                fastify.checkTenantByParams,
            ],
        },
        updateProductSort,
    );

    fastify.put(
        '/:productId/status',
        {
            preHandler: [
                fastify.authenticate,
                fastify.authorize(PERMISSIONS.UPDATE_PRODUCT),
                fastify.checkTenantByParams,
            ],
        },
        updateProductStatus,
    );

    fastify.put(
        '/:productId/type',
        {
            preHandler: [
                fastify.authenticate,
                fastify.authorize(PERMISSIONS.UPDATE_PRODUCT),
                fastify.checkTenantByParams,
            ],
        },
        updateProductType,
    );

    fastify.post(
        '/:productId/upload/image',
        {
            preHandler: [
                fastify.authenticate,
                fastify.authorize(PERMISSIONS.UPDATE_PRODUCT),
                fastify.checkTenantByParams,
            ],
        },
        uploadProductImage
    );

    fastify.delete(
        '/:productId/upload/image',
        {
            preHandler: [
                fastify.authenticate,
                fastify.authorize(PERMISSIONS.UPDATE_PRODUCT),
                fastify.checkTenantByParams,
            ],
        },
        removeProductImage
    );

    done();
};
