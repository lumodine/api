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
                fastify.checkTenantByParams,
            ],
        },
        updateItemType,
    );

    done();
};
