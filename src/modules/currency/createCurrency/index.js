const Currency = require('../currency.model');

module.exports = async (request, reply) => {
    const {
        code,
        number,
        symbol,
    } = request.body;

    const currency = await Currency.findOne({
        code,
    });

    if (currency) {
        return reply.send({
            success: false,
            message: request.i18n.currency_already_exists,
        });
    }

    const payload = {
        code,
        number,
        symbol,
    };

    const createdCurrency = await (new Currency(payload)).save();
    if (!createdCurrency) {
        return reply.send({
            success: false,
            message: request.i18n.currency_create_error,
        });
    }

    return reply.send({
        success: true,
        message: request.i18n.currency_create_success,
    });
};
