const userController = require('./user.controller');
const { PERMISSIONS } = require('../user/user.constant');
const {
    createUserSchema,
    updateUserSchema,
    deleteUserSchema,
    getByIdUserSchema,
    getAllUsersSchema,
} = require('./user.schema');

module.exports = (fastify, opts, done) => {
    fastify.post(
        '/',
        {
            ...createUserSchema,
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
            ...getAllUsersSchema,
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
            ...updateUserSchema,
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
            ...deleteUserSchema,
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
            ...getByIdUserSchema,
            preHandler: [
                fastify.authenticate,
                fastify.authorize(PERMISSIONS.GET_USER),
            ],
        },
        userController.getById
    );

    done();
};
