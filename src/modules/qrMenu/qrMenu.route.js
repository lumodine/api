const getMenu = require('./getMenu');
const getAllMenuCategories = require('./getAllMenuCategories');
const getMenuCategoryById = require('./getMenuCategoryById');
const getAllProductsByCategoryId = require('./getAllProductsByCategoryId');

module.exports = (fastify, opts, done) => {
    fastify.get(
        '/:tenantAlias',
        {
            preHandler: [
                fastify.checkTenantByParams,
            ],
        },
        getMenu
    );

    fastify.get(
        '/:tenantAlias/categories',
        {
            preHandler: [
                fastify.checkTenantByParams,
            ],
        },
        getAllMenuCategories
    );

    fastify.get(
        '/:tenantAlias/categories/:categoryId',
        {
            preHandler: [
                fastify.checkTenantByParams,
            ],
        },
        getMenuCategoryById
    );

    fastify.get(
        '/:tenantAlias/categories/:categoryId/products',
        {
            preHandler: [
                fastify.checkTenantByParams,
            ],
        },
        getAllProductsByCategoryId
    );

    done();
};
