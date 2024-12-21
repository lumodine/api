const getMenu = require('./getMenu');
const getAllMenuItems = require('./getAllMenuItems');
const getMenuItemById = require('./getMenuItemById');
const getAllAnnouncements = require('./getAllAnnouncements');

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

    fastify.get(
        '/:tenantAlias/announcements',
        {
            preHandler: [
                fastify.checkTenantByParams,
            ],
        },
        getAllAnnouncements
    );

    done();
};
