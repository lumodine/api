const unitController = require('./unit.controller');
const { PERMISSIONS } = require('../common/user.constant');

module.exports = (fastify, opts, done) => {
    fastify.post(
        '/',
        {
            preHandler: [
                fastify.authenticate,
                fastify.authorize(PERMISSIONS.CREATE_UNIT),
            ],
        },
        unitController.create
    );

    fastify.get(
        '/',
        {
            preHandler: [
                fastify.authenticate,
                fastify.authorize(PERMISSIONS.GET_ALL_UNITS),
            ],
        },
        unitController.getAll
    );

    fastify.put(
        '/:id',
        {
            preHandler: [
                fastify.authenticate,
                fastify.authorize(PERMISSIONS.UPDATE_UNIT),
            ],
        },
        unitController.update
    );

    fastify.delete(
        '/:id',
        {
            preHandler: [
                fastify.authenticate,
                fastify.authorize(PERMISSIONS.DELETE_UNIT),
            ],
        },
        unitController.remove
    );

    fastify.get(
        '/:id',
        {
            preHandler: [
                fastify.authenticate,
                fastify.authorize(PERMISSIONS.GET_UNIT),
            ],
        },
        unitController.getById
    );

    done();
};
