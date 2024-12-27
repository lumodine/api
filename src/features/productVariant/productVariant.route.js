const { PERMISSIONS } = require('../user/user.constant');
const createProductVariant = require('./createProductVariant');
const updateProductVariant = require('./updateProductVariant');
const removeProductVariant = require('./removeProductVariant');

module.exports = (fastify, opts, done) => {
    fastify.post(
        '/',
        {
            preHandler: [
                fastify.authenticate,
                fastify.authorize(PERMISSIONS.PRODUCT_VARIANT_CREATE),
                fastify.checkTenantByParams,
            ],
        },
        createProductVariant
    );

    fastify.put(
        '/:productVariantId',
        {
            preHandler: [
                fastify.authenticate,
                fastify.authorize(PERMISSIONS.PRODUCT_VARIANT_UPDATE),
                fastify.checkTenantByParams,
            ],
        },
        updateProductVariant
    );

    fastify.delete(
        '/:productVariantId',
        {
            preHandler: [
                fastify.authenticate,
                fastify.authorize(PERMISSIONS.PRODUCT_VARIANT_REMOVE),
                fastify.checkTenantByParams,
            ],
        },
        removeProductVariant
    );-

    done();
};
