const httpStatus = require('http-status').default;
const currencyService = require('../services/currency.service');

const create = async (request, reply) => {
    const {
        code,
        number,
        symbol,
    } = request.body;

    const payload = {
        code,
        number,
        symbol,
    };

    const item = await currencyService.create(payload);

    if (!item) {
        return reply.code(httpStatus.NOT_FOUND).send({
            success: false,
            message: 'currency_create_error'
        });
    }

    return reply.code(httpStatus.OK).send({
        success: true,
        message: 'currency_create_success',
        data: item,
    });
};

const update = async (request, reply) => {
    const { id } = request.params;

    const findedItem = await currencyService.getById(id);

    if (!findedItem) {
        return reply.code(httpStatus.NOT_FOUND).send({
            success: false,
            message: 'currency_not_found'
        });
    }
    
    const {
        code,
        number,
        symbol,
    } = request.body;

    const payload = {
        code,
        number,
        symbol,
    };

    const item = await currencyService.update(id, payload);

    if (!item) {
        return reply.code(httpStatus.NOT_FOUND).send({
            success: false,
            message: 'currency_update_error'
        });
    }

    return reply.code(httpStatus.OK).send({
        success: true,
        message: 'currency_update_success',
        data: item,
    });
};

const remove = async (request, reply) => {
    const { id } = request.params;

    const findedItem = await currencyService.getById(id);

    if (!findedItem) {
        return reply.code(httpStatus.NOT_FOUND).send({
            success: false,
            message: 'currency_not_found'
        });
    }

    const item = await currencyService.remove(id);

    if (!item) {
        return reply.code(httpStatus.NOT_FOUND).send({
            success: false,
            message: 'currency_remove_error'
        });
    }

    return reply.code(httpStatus.OK).send({
        success: true,
        message: 'currency_remove_success',
    });
};

const getAll = async (request, reply) => {
    const items = await currencyService.getAll();

    return reply.code(httpStatus.OK).send({
        success: true,
        data: items,
    });
};

const getById = async (request, reply) => {
    const { id } = request.params;

    const item = await currencyService.getById(id);

    if (!item) {
        return reply.code(httpStatus.NOT_FOUND).send({
            success: false,
            message: 'currency_not_found'
        });
    }

    return reply.code(httpStatus.OK).send({
        success: true,
        data: item,
    });
};

module.exports = {
    create,
    update,
    remove,
    getAll,
    getById,
};
