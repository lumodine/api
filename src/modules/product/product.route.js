const { PERMISSIONS } = require('../user/user.constant');
const createProduct = require('./createProduct');
const updateProduct = require('./updateProduct');
const removeProduct = require('./removeProduct');
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
