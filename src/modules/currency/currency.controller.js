const Currency = require('./currency.model');

const create = async (request, reply) => {
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
            message: 'currency_already_exists',
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
            message: 'currency_create_error',
        });
    }

    return reply.send({
        success: true,
        message: 'currency_create_success',
    });
};

const update = async (request, reply) => {
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

const remove = async (request, reply) => {
    const { currencyId } = request.params;

    const currency = await Currency.findById(currencyId);

    if (!currency) {
        return reply.send({
            success: false,
            message: 'currency_not_found',
        });
    }

    const isRemoved = await Currency.findByIdAndDelete(currency._id);
    if (!isRemoved) {
        return reply.send({
            success: false,
            message: 'currency_remove_error',
        });
    }

    return reply.send({
        success: true,
        message: 'currency_remove_success',
    });
};

const getAll = async (request, reply) => {
    const currencies = await Currency.find({});

    if (currencies.length === 0) {
        return reply.send({
            success: false,
            message: 'currencies_not_found',
        });
    }

    return reply.send({
        success: true,
        data: currencies,
    });
};

const getById = async (request, reply) => {
    const { currencyId } = request.params;

    const currency = await Currency.findById(currencyId);

    if (!currency) {
        return reply.send({
            success: false,
            message: 'currency_not_found',
        });
    }

    return reply.send({
        success: true,
        data: currency,
    });
};

module.exports = {
    create,
    update,
    remove,
    getAll,
    getById,
};
