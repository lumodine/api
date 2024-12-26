const { PERMISSIONS } = require('../user/user.constant');
const getAllItems = require('./getAllItems');
const updateItemSort = require('./updateItemSort');
const updateItemStatus = require('./updateItemStatus');
const updateItemType = require('./updateItemType');
const getItemById = require('./getItemById');

module.exports = (fastify, opts, done) => {
    fastify.get(
        '/',
        {
            preHandler: [
                fastify.authenticate,
                fastify.authorize(PERMISSIONS.ITEM_GET_ALL),
                fastify.checkTenantByParams,
            ],
        },
        getAllItems
    );

    fastify.get(
        '/:itemId',
        {
            preHandler: [
                fastify.authenticate,
                fastify.authorize(PERMISSIONS.ITEM_GET_BY_ID),
                fastify.checkTenantByParams,
            ],
        },
        getItemById
    );

    fastify.put(
        '/sort',
        {
            preHandler: [
                fastify.authenticate,
                fastify.authorize(PERMISSIONS.ITEM_UPDATE_SORT),
                fastify.checkTenantByParams,
            ],
        },
        updateItemSort,
    );

    fastify.put(
        '/:itemId/status',
        {
            preHandler: [
                fastify.authenticate,
                fastify.authorize(PERMISSIONS.ITEM_UPDATE_STATUS),
                fastify.checkTenantByParams,
            ],
        },
        updateItemStatus,
    );

    fastify.put(
        '/:itemId/type',
        {
            preHandler: [
                fastify.authenticate,
                fastify.authorize(PERMISSIONS.ITEM_UPDATE_TYPE),
                fastify.checkTenantByParams,
            ],
        },
        updateItemType,
    );

    fastify.register(require('../category'));
    
    // fastify.register(require('../subCategory'));

    fastify.register(require('../product'));

    fastify.register(require('../productVariant'));

    fastify.register(require('../tag'));

    done();
};
