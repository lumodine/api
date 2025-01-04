const { PERMISSIONS } = require('../user/user.constant');
const getMenu = require('./getMenu');
const getAllMenuItems = require('./getAllMenuItems');
const getMenuItemById = require('./getMenuItemById');
const getAllAnnouncements = require('./getAllAnnouncements');
const getAllTenantBranches = require('./getAllTenantBranches');

module.exports = (fastify, opts, done) => {
    fastify.get(
        '/:tenantAlias',
        {
            preHandler: [
                //fastify.authenticate,
                //fastify.authorize(PERMISSIONS.QR_MENU_GET_MENU),
                fastify.checkTenantByParams,
            ],
        },
        getMenu
    );

    fastify.get(
        '/:tenantAlias/branches',
        {
            preHandler: [
                //fastify.authenticate,
                //fastify.authorize(PERMISSIONS.QR_MENU_GET_ALL_TENANT_BRANCHES),
                fastify.checkTenantByParams,
            ],
        },
        getAllTenantBranches
    );

    fastify.get(
        '/:tenantAlias/items',
        {
            preHandler: [
                //fastify.authenticate,
                //fastify.authorize(PERMISSIONS.QR_MENU_GET_ALL_MENU_ITEMS),
                fastify.checkTenantByParams,
            ],
        },
        getAllMenuItems
    );

    fastify.get(
        '/:tenantAlias/items/:itemId',
        {
            preHandler: [
                //fastify.authenticate,
                //fastify.authorize(PERMISSIONS.QR_MENU_GET_MENU_ITEM_BY_ID),
                fastify.checkTenantByParams,
            ],
        },
        getMenuItemById
    );

    fastify.get(
        '/:tenantAlias/announcements',
        {
            preHandler: [
                //fastify.authenticate,
                //fastify.authorize(PERMISSIONS.QR_MENU_GET_ALL_ANNOUNCEMENTS),
                fastify.checkTenantByParams,
            ],
        },
        getAllAnnouncements
    );

    done();
};
