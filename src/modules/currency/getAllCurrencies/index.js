const Currency = require('../currency.model');

module.exports = async (request, reply) => {
    const currencies = await Currency.find({});

    if (currencies.length === 0) {
        return reply.send({
            success: false,
            message: request.i18n.currencies_not_found,
        });
    }

    return reply.send({
        success: true,
        data: currencies,
    });
};
