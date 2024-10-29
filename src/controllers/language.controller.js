const httpStatus = require('http-status').default;
const languageService = require('../services/language.service');

const create = async (request, reply) => {
    const {
        name,
        shortName,
        culture,
        flag,
        direction,
    } = request.body;

    const payload = {
        name,
        shortName,
        culture,
        flag,
        direction,
    };

    const item = await languageService.create(payload);

    if (!item) {
        return reply.code(httpStatus.NOT_FOUND).send({
            success: false,
            message: 'language_create_error'
        });
    }

    return reply.code(httpStatus.OK).send({
        success: true,
        message: 'language_create_success',
        data: item,
    });
};

const update = async (request, reply) => {
    const { id } = request.params;

    const findedItem = await languageService.getById(id);

    if (!findedItem) {
        return reply.code(httpStatus.NOT_FOUND).send({
            success: false,
            message: 'language_not_found'
        });
    }

    const {
        name,
        shortName,
        culture,
        flag,
        direction,
    } = request.body;

    const payload = {
        name,
        shortName,
        culture,
        flag,
        direction,
    };

    const item = await languageService.update(id, payload);

    if (!item) {
        return reply.code(httpStatus.NOT_FOUND).send({
            success: false,
            message: 'language_update_error'
        });
    }

    return reply.code(httpStatus.OK).send({
        success: true,
        message: 'language_update_success',
        data: item,
    });
};

const remove = async (request, reply) => {
    const { id } = request.params;

    const findedItem = await languageService.getById(id);

    if (!findedItem) {
        return reply.code(httpStatus.NOT_FOUND).send({
            success: false,
            message: 'language_not_found'
        });
    }

    const item = await languageService.remove(id);

    if (!item) {
        return reply.code(httpStatus.NOT_FOUND).send({
            success: false,
            message: 'language_remove_error'
        });
    }

    return reply.code(httpStatus.OK).send({
        success: true,
        message: 'language_remove_success',
    });
};

const getAll = async (request, reply) => {
    const items = await languageService.getAll();

    return reply.code(httpStatus.OK).send({
        success: true,
        data: items,
    });
};

const getById = async (request, reply) => {
    const { id } = request.params;

    const item = await languageService.getById(id);

    if (!item) {
        return reply.code(httpStatus.NOT_FOUND).send({
            success: false,
            message: 'language_not_found'
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
