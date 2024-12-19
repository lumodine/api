const getAllItems = require('./getAllItems');
const updateItemSort = require('./updateItemSort');
const updateItemStatus = require('./updateItemStatus');
const updateItemType = require('./updateItemType');

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
