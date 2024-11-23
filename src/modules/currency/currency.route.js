const currencyController = require('./currency.controller');
const { PERMISSIONS } = require('../user/user.constant');

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
        currencyController.getAll
    );

    fastify.put(
        '/:currencyId',
        {
            preHandler: [
                fastify.authenticate,
                fastify.authorize(PERMISSIONS.UPDATE_CURRENCY),
            ],
        },
        currencyController.update
    );

    fastify.delete(
        '/:currencyId',
        {
            preHandler: [
                fastify.authenticate,
                fastify.authorize(PERMISSIONS.DELETE_CURRENCY),
            ],
        },
        currencyController.remove
    );

    fastify.get(
        '/:currencyId',
        currencyController.getById
    );

    done();
};
