const qrMenuController = require('./qr-menu.controller');
const {
    getDetailSchema,
    getCategoriesSchema,
    getProductsSchema,
    getCategoryByIdSchema,
} = require('./qr-menu.schema');

module.exports = (fastify, opts, done) => {
    fastify.get(
        '/:tenantAlias',
        {
            ...getDetailSchema,
            preHandler: [
                fastify.checkTenantByParams,
            ],
        },
        qrMenuController.getDetail
    );

    fastify.get(
        '/:tenantAlias/categories',
        {
            ...getCategoriesSchema,
            preHandler: [
                fastify.checkTenantByParams,
            ],
        },
        qrMenuController.getCategories
    );

    fastify.get(
        '/:tenantAlias/categories/:categoryId',
        {
            ...getCategoryByIdSchema,
            preHandler: [
                fastify.checkTenantByParams,
            ],
        },
        qrMenuController.getCategoryById
    );

    fastify.get(
        '/:tenantAlias/categories/:categoryId/products',
        {
            ...getProductsSchema,
            preHandler: [
                fastify.checkTenantByParams,
            ],
        },
        qrMenuController.getProducts
    );

    done();
};
