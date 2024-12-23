const { PERMISSIONS } = require('../user/user.constant');
const createProduct = require('./createProduct');
const updateProduct = require('./updateProduct');
const removeProduct = require('./removeProduct');
const getProductById = require('./getProductById');
const getAllProducts = require('./getAllProducts');
const uploadProductImage = require('./uploadProductImage');
const removeProductImage = require('./removeProductImage');

module.exports = (fastify, opts, done) => {
    fastify.post(
        '/',
        {
            preHandler: [
                fastify.authenticate,
                fastify.authorize(PERMISSIONS.PRODUCT_CREATE),
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
                fastify.authorize(PERMISSIONS.PRODUCT_GET_ALL),
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
                fastify.authorize(PERMISSIONS.PRODUCT_UPDATE),
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
                fastify.authorize(PERMISSIONS.PRODUCT_REMOVE),
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
                fastify.authorize(PERMISSIONS.PRODUCT_GET_BY_ID),
                fastify.checkTenantByParams,
            ],
        },
        getProductById
    );

    fastify.post(
        '/:productId/upload/image',
        {
            preHandler: [
                fastify.authenticate,
                fastify.authorize(PERMISSIONS.PRODUCT_UPLOAD_IMAGE),
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
                fastify.authorize(PERMISSIONS.PRODUCT_REMOVE_IMAGE),
                fastify.checkTenantByParams,
            ],
        },
        removeProductImage
    );

    done();
};
