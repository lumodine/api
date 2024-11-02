const httpStatus = require('http-status').default;
const tenantService = require('../services/tenant.service');

const create = async (request, reply) => {
    const {
        alias,
        name,
        logo,
        background,
        address,
        defaultLanguage,
        languages,
        defaultCurrency,
        currencies,
    } = request.body;

    const payload = {
        alias,
        name,
        logo,
        background,
        address,
        defaultLanguage,
        languages,
        defaultCurrency,
        currencies,
    };

    const item = await tenantService.create(payload);

    if (!item) {
        return reply.code(httpStatus.NOT_FOUND).send({
            success: false,
            message: 'tenant_create_error'
        });
    }

    return reply.code(httpStatus.OK).send({
        success: true,
        message: 'tenant_create_success',
        data: item,
    });
};

const update = async (request, reply) => {
    const { id } = request.params;

    const findedItem = await tenantService.getById(id);

    if (!findedItem) {
        return reply.code(httpStatus.NOT_FOUND).send({
            success: false,
            message: 'tenant_not_found'
        });
    }

    const {
        alias,
        name,
        logo,
        background,
        address,
        defaultLanguage,
        languages,
        defaultCurrency,
        currencies,
    } = request.body;

    const payload = {
        alias,
        name,
        logo,
        background,
        address,
        defaultLanguage,
        languages,
        defaultCurrency,
        currencies,
    };

    const item = await tenantService.update(id, payload);

    if (!item) {
        return reply.code(httpStatus.NOT_FOUND).send({
            success: false,
            message: 'tenant_update_error'
        });
    }

    return reply.code(httpStatus.OK).send({
        success: true,
        message: 'tenant_update_success',
        data: item,
    });
};

const remove = async (request, reply) => {
    const { id } = request.params;

    const findedItem = await tenantService.getById(id);

    if (!findedItem) {
        return reply.code(httpStatus.NOT_FOUND).send({
            success: false,
            message: 'tenant_not_found'
        });
    }

    const item = await tenantService.remove(id);

    if (!item) {
        return reply.code(httpStatus.NOT_FOUND).send({
            success: false,
            message: 'tenant_remove_error'
        });
    }

    return reply.code(httpStatus.OK).send({
        success: true,
        message: 'tenant_remove_success',
    });
};

const getAll = async (request, reply) => {
    const items = await tenantService.getAll();

    return reply.code(httpStatus.OK).send({
        success: true,
        data: items,
    });
};

const getById = async (request, reply) => {
    const { id } = request.params;

    const item = await tenantService.getById(id);

    if (!item) {
        return reply.code(httpStatus.NOT_FOUND).send({
            success: false,
            message: 'tenant_not_found'
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
