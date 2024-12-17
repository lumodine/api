const tagController = require('./tag.controller');
const { PERMISSIONS } = require('../user/user.constant');

module.exports = (fastify, opts, done) => {
    fastify.post(
        '/',
        {
            preHandler: [
                fastify.authenticate,
                fastify.authorize(PERMISSIONS.CREATE_TAG),
                fastify.checkTenantByParams,
            ],
        },
        tagController.create,
    );

    fastify.get(
        '/',
        {
            preHandler: [
                fastify.authenticate,
                fastify.authorize(PERMISSIONS.GET_ALL_TAGS),
                fastify.checkTenantByParams,
            ],
        },
        tagController.getAll,
    );

    fastify.put(
        '/:tagId',
        {
            preHandler: [
                fastify.authenticate,
                fastify.authorize(PERMISSIONS.UPDATE_TAG),
                fastify.checkTenantByParams,
            ],
        },
        tagController.update,
    );

    fastify.delete(
        '/:tagId',
        {
            preHandler: [
                fastify.authenticate,
                fastify.authorize(PERMISSIONS.DELETE_TAG),
                fastify.checkTenantByParams,
            ],
        },
        tagController.remove,
    );

    fastify.get(
        '/:tagId',
        {
            preHandler: [
                fastify.authenticate,
                fastify.authorize(PERMISSIONS.GET_TAG),
                fastify.checkTenantByParams,
            ],
        },
        tagController.getById,
    );

    done();
};
