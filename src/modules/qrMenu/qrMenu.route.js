const getMenu = require('./getMenu');
const getAllMenuItems = require('./getAllMenuItems');
const getMenuItemById = require('./getMenuItemById');

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
        '/:tenantAlias/items',
        {
            preHandler: [
                fastify.checkTenantByParams,
            ],
        },
        getAllMenuItems
    );

    fastify.get(
        '/:tenantAlias/items/:itemId',
        {
            preHandler: [
                fastify.checkTenantByParams,
            ],
        },
        getMenuItemById
    );

    done();
};
