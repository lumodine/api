const qrMenuController = require('./qr-menu.controller');

module.exports = (fastify, opts, done) => {
    fastify.get(
        '/:tenantAlias',
        {
            preHandler: [
                fastify.checkTenantByParams,
            ],
        },
        qrMenuController.getDetail
    );

    fastify.get(
        '/:tenantAlias/categories',
        {
            preHandler: [
                fastify.checkTenantByParams,
            ],
        },
        qrMenuController.getCategories
    );

    fastify.get(
        '/:tenantAlias/categories/:categoryId',
        {
            preHandler: [
                fastify.checkTenantByParams,
            ],
        },
        qrMenuController.getCategoryById
    );

    fastify.get(
        '/:tenantAlias/categories/:categoryId/products',
        {
            preHandler: [
                fastify.checkTenantByParams,
            ],
        },
        qrMenuController.getProducts
    );

    done();
};
