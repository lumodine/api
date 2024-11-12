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
        getAllCurrenciesSchema,
        currencyController.getAll
    );

    fastify.put(
        '/:currencyId',
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
        '/:currencyId',
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
        '/:currencyId',
        getByIdCurrencySchema,
        currencyController.getById
    );

    done();
};
