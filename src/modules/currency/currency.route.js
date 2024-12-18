const { PERMISSIONS } = require('../user/user.constant');
const createCurrency = require('./createCurrency');
const updateCurrency = require('./updateCurrency');
const removeCurrency = require('./removeCurrency');
const getCurrencyById = require('./getCurrencyById');
const getAllCurrencies = require('./getAllCurrencies');

module.exports = (fastify, opts, done) => {
    fastify.post(
        '/',
        {
            preHandler: [
                fastify.authenticate,
                fastify.authorize(PERMISSIONS.CREATE_CURRENCY),
            ],
        },
        createCurrency
    );

    fastify.get(
        '/',
        getAllCurrencies
    );

    fastify.put(
        '/:currencyId',
        {
            preHandler: [
                fastify.authenticate,
                fastify.authorize(PERMISSIONS.UPDATE_CURRENCY),
            ],
        },
        updateCurrency
    );

    fastify.delete(
        '/:currencyId',
        {
            preHandler: [
                fastify.authenticate,
                fastify.authorize(PERMISSIONS.DELETE_CURRENCY),
            ],
        },
        removeCurrency
    );

    fastify.get(
        '/:currencyId',
        getCurrencyById
    );

    done();
};
