const httpStatus = require('http-status').default;
const userService = require('../services/user.service');

const create = async (request, reply) => {
    const {
        email,
        name,
        surname,
        password,
        tenants,
    } = request.body;

    const payload = {
        email,
        name,
        surname,
        password,
        tenants,
    };

    const item = await userService.create(payload);

    if (!item) {
        return reply.code(httpStatus.NOT_FOUND).send({
            success: false,
            message: 'user_create_error'
        });
    }

    return reply.code(httpStatus.OK).send({
        success: true,
        message: 'user_create_success',
        data: item,
    });
};

const update = async (request, reply) => {
    const { id } = request.params;

    const findedItem = await userService.getById(id);

    if (!findedItem) {
        return reply.code(httpStatus.NOT_FOUND).send({
            success: false,
            message: 'user_not_found'
        });
    }
    
    const {
        email,
        name,
        surname,
        password,
        tenants,
    } = request.body;

    const payload = {
        email,
        name,
        surname,
        password,
        tenants,
    };

    const item = await userService.update(id, payload);

    if (!item) {
        return reply.code(httpStatus.NOT_FOUND).send({
            success: false,
            message: 'user_update_error'
        });
    }

    return reply.code(httpStatus.OK).send({
        success: true,
        message: 'user_update_success',
        data: item,
    });
};

const remove = async (request, reply) => {
    const { id } = request.params;

    const findedItem = await userService.getById(id);

    if (!findedItem) {
        return reply.code(httpStatus.NOT_FOUND).send({
            success: false,
            message: 'user_not_found'
        });
    }

    const item = await userService.remove(id);

    if (!item) {
        return reply.code(httpStatus.NOT_FOUND).send({
            success: false,
            message: 'user_remove_error'
        });
    }

    return reply.code(httpStatus.OK).send({
        success: true,
        message: 'user_remove_success',
    });
};

const getAll = async (request, reply) => {
    const items = await userService.getAll();

    return reply.code(httpStatus.OK).send({
        success: true,
        data: items,
    });
};

const getById = async (request, reply) => {
    const { id } = request.params;

    const item = await userService.getById(id);

    if (!item) {
        return reply.code(httpStatus.NOT_FOUND).send({
            success: false,
            message: 'user_not_found'
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
