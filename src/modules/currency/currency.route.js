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
                fastify.authorize(PERMISSIONS.CURRENCY_CREATE),
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
                fastify.authorize(PERMISSIONS.CURRENCY_UPDATE),
            ],
        },
        updateCurrency
    );

    fastify.delete(
        '/:currencyId',
        {
            preHandler: [
                fastify.authenticate,
                fastify.authorize(PERMISSIONS.CURRENCY_REMOVE),
            ],
        },
        removeCurrency
    );

    fastify.get(
        '/:currencyId',
        {
            preHandler: [
                fastify.authenticate,
                fastify.authorize(PERMISSIONS.CURRENCY_GET_BY_ID),
            ],
        },
        getCurrencyById
    );

    done();
};
