const Currency = require('../currency.model');

module.exports = async (request, reply) => {
    const { currencyId } = request.params;
    const {
        code,
        number,
        symbol,
    } = request.body;

    const currency = await Currency.findById(currencyId);

    if (!currency) {
        return reply.send({
            success: false,
            message: 'currency_not_found',
        });
    }

    const hasCurrency = await Currency.findOne({
        _id: {
            $ne: currencyId,
        },
        code,
    });

    if (hasCurrency) {
        return reply.send({
            success: false,
            message: 'currency_already_exists',
        });
    }

    const payload = {
        code,
        number,
        symbol,
    };

    const updatedCurrency = await Currency.findByIdAndUpdate(
        currencyId,
        payload,
        {
            new: true,
        }
    );

    if (!updatedCurrency) {
        return reply.send({
            success: false,
            message: 'currency_update_error',
        });
    }

    return reply.send({
        success: true,
        data: updatedCurrency,
    });
};
