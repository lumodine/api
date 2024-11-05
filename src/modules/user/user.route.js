const userController = require('./user.controller');
const { PERMISSIONS } = require('../common/user.constant');

module.exports = (fastify, opts, done) => {
    fastify.post(
        '/',
        {
            preHandler: [
                fastify.authenticate,
                fastify.authorize(PERMISSIONS.CREATE_USER),
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
            ],
        },
        userController.remove
    );

    fastify.get(
        '/:id',
        {
            preHandler: [
                fastify.authenticate,
                fastify.authorize(PERMISSIONS.GET_USER),
            ],
        },
        userController.getById
    );

    done();
};
