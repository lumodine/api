const Currency = require('./currency.model');

const create = async (code, number, symbol) => {
    const payload = {
        code,
        number,
        symbol,
    };

    const currency = await (new Currency(payload)).save();

    if (!currency) {
        return {
            success: false,
            message: 'currency_create_error'
        };
    }

    return {
        success: true,
        message: 'currency_create_success',
        data: currency,
    };
};

const update = async (id, code, number, symbol) => {
    const hasCurrency = await Currency
        .findOne(
            {
                _id: id,
            }
        );

    if (!hasCurrency) {
        return {
            success: false,
            message: 'currency_not_found'
        };
    }

    const payload = {
        code,
        number,
        symbol,
    };

    const newCurrency = await Currency
        .findByIdAndUpdate(
            id,
            payload,
            {
                new: true,
            }
        );

    if (!newCurrency) {
        return {
            success: false,
            message: 'currency_update_error'
        };
    }

    return {
        success: true,
        message: 'currency_update_success',
        data: newCurrency,
    };
};

const remove = async (id) => {
    const hasCurrency = await Currency
        .findOne(
            {
                _id: id,
            }
        );

    if (!hasCurrency) {
        return {
            success: false,
            message: 'currency_not_found'
        };
    }

    const isRemoved = await Currency
        .findByIdAndDelete(id);

    if (!isRemoved) {
        return {
            success: false,
            message: 'currency_remove_error'
        };
    }

    return {
        success: true,
        message: 'currency_remove_success',
    };
};

const getAll = async () => {
    const items = await Currency
        .find({});

    if (items.length == 0) {
        return {
            success: false,
            message: 'currencies_not_found',
        };
    }

    return {
        success: true,
        data: items,
    };
};

const getById = async (id) => {
    const currency = await Currency
        .findOne(
            {
                _id: id,
            }
        );

    if (!currency) {
        return {
            success: false,
            message: 'currency_not_found'
        };
    }

    return {
        success: true,
        data: currency,
    };
};

module.exports = {
    create,
    update,
    remove,
    getAll,
    getById,
};
