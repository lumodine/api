const categoryController = require('./category.controller');
const { PERMISSIONS } = require('../user/user.constant');

module.exports = (fastify, opts, done) => {
    fastify.post(
        '/',
        {
            preHandler: [
                fastify.authenticate,
                fastify.authorize(PERMISSIONS.CREATE_CATEGORY),
                fastify.checkTenantByParams,
            ],
        },
        categoryController.create,
    );

    fastify.get(
        '/',
        {
            preHandler: [
                fastify.authenticate,
                fastify.authorize(PERMISSIONS.GET_ALL_CATEGORIES),
                fastify.checkTenantByParams,
            ],
        },
        categoryController.getAll,
    );

    fastify.put(
        '/:categoryId',
        {
            preHandler: [
                fastify.authenticate,
                fastify.authorize(PERMISSIONS.UPDATE_CATEGORY),
                fastify.checkTenantByParams,
            ],
        },
        categoryController.update,
    );

    fastify.delete(
        '/:categoryId',
        {
            preHandler: [
                fastify.authenticate,
                fastify.authorize(PERMISSIONS.DELETE_CATEGORY),
                fastify.checkTenantByParams,
            ],
        },
        categoryController.remove,
    );

    fastify.get(
        '/:categoryId',
        {
            preHandler: [
                fastify.authenticate,
                fastify.authorize(PERMISSIONS.GET_CATEGORY),
                fastify.checkTenantByParams,
            ],
        },
        categoryController.getById,
    );

    fastify.put(
        '/sort',
        {
            preHandler: [
                fastify.authenticate,
                fastify.authorize(PERMISSIONS.UPDATE_CATEGORY),
                fastify.checkTenantByParams,
            ],
        },
        categoryController.updateSort,
    );

    fastify.put(
        '/:categoryId/status',
        {
            preHandler: [
                fastify.authenticate,
                fastify.authorize(PERMISSIONS.UPDATE_CATEGORY),
                fastify.checkTenantByParams,
            ],
        },
        categoryController.updateStatus,
    );

    fastify.put(
        '/:categoryId/type',
        {
            preHandler: [
                fastify.authenticate,
                fastify.authorize(PERMISSIONS.UPDATE_CATEGORY),
                fastify.checkTenantByParams,
            ],
        },
        categoryController.updateType,
    );

    fastify.post(
        '/:categoryId/upload/image',
        {
            preHandler: [
                fastify.authenticate,
                fastify.authorize(PERMISSIONS.UPDATE_CATEGORY),
                fastify.checkTenantByParams,
            ],
        },
        categoryController.uploadImage
    );

    fastify.register(
        require('../product'),
        {
            prefix: '/:categoryId',
        },
    );

    done();
};
