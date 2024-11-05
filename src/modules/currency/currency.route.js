const currencyController = require('./currency.controller');
const { PERMISSIONS } = require('../common/user.constant');

module.exports = (fastify, opts, done) => {
    fastify.post(
        '/',
        {
            preHandler: [
                fastify.authenticate,
                fastify.authorize(PERMISSIONS.CREATE_CURRENCY),
            ],
        },
        currencyController.create
    );

    fastify.get(
        '/',
        {
            preHandler: [
                fastify.authenticate,
                fastify.authorize(PERMISSIONS.GET_ALL_CURRENCIES),
            ],
        },
        currencyController.getAll
    );

    fastify.put(
        '/:id',
        {
            preHandler: [
                fastify.authenticate,
                fastify.authorize(PERMISSIONS.UPDATE_CURRENCY),
            ],
        },
        currencyController.update
    );

    fastify.delete(
        '/:id',
        {
            preHandler: [
                fastify.authenticate,
                fastify.authorize(PERMISSIONS.DELETE_CURRENCY),
            ],
        },
        currencyController.remove
    );

    fastify.get(
        '/:id',
        {
            preHandler: [
                fastify.authenticate,
                fastify.authorize(PERMISSIONS.GET_CURRENCY),
            ],
        },
        currencyController.getById
    );

    done();
};
