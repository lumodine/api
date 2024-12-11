const userController = require('./user.controller');
const { PERMISSIONS } = require('../user/user.constant');

module.exports = (fastify, opts, done) => {
    fastify.post(
        '/',
        {
            preHandler: [
                fastify.authenticate,
                fastify.authorize(PERMISSIONS.CREATE_USER),
                fastify.checkTenantByParams,
            ],
        },
        userController.create
    );

    fastify.get(
        '/',
        {
            preHandler: [
                fastify.authenticate,
                fastify.authorize(PERMISSIONS.GET_ALL_USERS),
                fastify.checkTenantByParams,
            ],
        },
        userController.getAll
    );

    fastify.put(
        '/:id',
        {
            preHandler: [
                fastify.authenticate,
                fastify.authorize(PERMISSIONS.UPDATE_USER),
                fastify.checkTenantByParams,
            ],
        },
        userController.update
    );

    fastify.delete(
        '/:id',
        {
            preHandler: [
                fastify.authenticate,
                fastify.authorize(PERMISSIONS.DELETE_USER),
                fastify.checkTenantByParams,
            ],
        },
        userController.remove
    );

    done();
};
