const httpStatus = require('http-status').default;
const unitRepository = require('./unit.repository');

const create = async (request, reply) => {
    const {
        tenant,
        translations,
    } = request.body;

    const payload = {
        tenant,
        translations,
    };

    const item = await unitRepository.create(payload);

    if (!item) {
        return reply.code(httpStatus.NOT_FOUND).send({
            success: false,
            message: 'unit_create_error'
        });
    }

    return reply.code(httpStatus.OK).send({
        success: true,
        message: 'unit_create_success',
        data: item,
    });
};

const update = async (request, reply) => {
    const { id } = request.params;

    const findedItem = await unitRepository.getById(id);

    if (!findedItem) {
        return reply.code(httpStatus.NOT_FOUND).send({
            success: false,
            message: 'unit_not_found'
        });
    }
    
    const {
        tenant,
        translations,
    } = request.body;

    const payload = {
        tenant,
        translations,
    };

    const item = await unitRepository.update(id, payload);

    if (!item) {
        return reply.code(httpStatus.NOT_FOUND).send({
            success: false,
            message: 'unit_update_error'
        });
    }

    return reply.code(httpStatus.OK).send({
        success: true,
        message: 'unit_update_success',
        data: item,
    });
};

const remove = async (request, reply) => {
    const { id } = request.params;

    const findedItem = await unitRepository.getById(id);

    if (!findedItem) {
        return reply.code(httpStatus.NOT_FOUND).send({
            success: false,
            message: 'unit_not_found'
        });
    }

    const item = await unitRepository.remove(id);

    if (!item) {
        return reply.code(httpStatus.NOT_FOUND).send({
            success: false,
            message: 'unit_remove_error'
        });
    }

    return reply.code(httpStatus.OK).send({
        success: true,
        message: 'unit_remove_success',
    });
};

const getAll = async (request, reply) => {
    const items = await unitRepository.getAll();

    return reply.code(httpStatus.OK).send({
        success: true,
        data: items,
    });
};

const getById = async (request, reply) => {
    const { id } = request.params;

    const item = await unitRepository.getById(id);

    if (!item) {
        return reply.code(httpStatus.NOT_FOUND).send({
            success: false,
            message: 'unit_not_found'
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
