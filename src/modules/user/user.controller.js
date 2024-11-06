const httpStatus = require('http-status').default;
const userRepository = require('./user.repository');

const create = async (request, reply) => {
    const {
        email,
        name,
        surname,
        password,
    } = request.body;

    const payload = {
        email,
        name,
        surname,
        password,
    };

    const item = await userRepository.create(payload);

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

    const findedItem = await userRepository.getById(id);

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
    } = request.body;

    const payload = {
        email,
        name,
        surname,
        password,
    };

    const item = await userRepository.update(id, payload);

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

    const findedItem = await userRepository.getById(id);

    if (!findedItem) {
        return reply.code(httpStatus.NOT_FOUND).send({
            success: false,
            message: 'user_not_found'
        });
    }

    const item = await userRepository.remove(id);

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
    const items = await userRepository.getAll();

    if (items.length == 0) {
        return reply.code(httpStatus.NOT_FOUND).send({
            success: false,
            message: 'users_not_found',
        });
    }

    return reply.code(httpStatus.OK).send({
        success: true,
        data: items,
    });
};

const getById = async (request, reply) => {
    const { id } = request.params;

    const item = await userRepository.getById(id);

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
