const Currency = require('../currency.model');

module.exports = async (request, reply) => {
    const { currencyId } = request.params;

    const currency = await Currency.findById(currencyId);

    if (!currency) {
        return reply.send({
            success: false,
            message: request.i18n.currency_not_found,
        });
    }

    return reply.send({
        success: true,
        data: currency,
    });
};
