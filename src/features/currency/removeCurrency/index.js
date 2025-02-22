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

    const isRemoved = await Currency.findByIdAndDelete(currency._id);
    if (!isRemoved) {
        return reply.send({
            success: false,
            message: request.i18n.currency_remove_error,
        });
    }

    return reply.send({
        success: true,
        message: request.i18n.currency_remove_success,
    });
};
