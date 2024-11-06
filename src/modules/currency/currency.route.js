const currencyController = require('./currency.controller');
const { PERMISSIONS } = require('../user/user.constant');
const {
    createCurrencySchema,
    updateCurrencySchema,
    deleteCurrencySchema,
    getByIdCurrencySchema,
    getAllCurrenciesSchema,
} = require('./currency.schema');

module.exports = (fastify, opts, done) => {
    fastify.post(
        '/',
        {
            ...createCurrencySchema,
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
            ...getAllCurrenciesSchema,
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
            ...updateCurrencySchema,
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
            ...deleteCurrencySchema,
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
            ...getByIdCurrencySchema,
            preHandler: [
                fastify.authenticate,
                fastify.authorize(PERMISSIONS.GET_CURRENCY),
            ],
        },
        currencyController.getById
    );

    done();
};
