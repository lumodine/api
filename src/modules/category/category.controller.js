const httpStatus = require('http-status').default;
const categoryRepository = require('./category.repository');

const create = async (request, reply) => {
    const {
        tenant,
        translations,
        image,
    } = request.body;

    const payload = {
        tenant,
        translations,
        image,
    };

    const item = await categoryRepository.create(payload);

    if (!item) {
        return reply.code(httpStatus.NOT_FOUND).send({
            success: false,
            message: 'category_create_error'
        });
    }

    return reply.code(httpStatus.OK).send({
        success: true,
        message: 'category_create_success',
        data: item,
    });
};

const update = async (request, reply) => {
    const { id } = request.params;

    const findedItem = await categoryRepository.getById(id);

    if (!findedItem) {
        return reply.code(httpStatus.NOT_FOUND).send({
            success: false,
            message: 'category_not_found'
        });
    }

    const {
        tenant,
        translations,
        image,
    } = request.body;

    const payload = {
        tenant,
        translations,
        image,
    };

    const item = await categoryRepository.update(id, payload);

    if (!item) {
        return reply.code(httpStatus.NOT_FOUND).send({
            success: false,
            message: 'category_update_error'
        });
    }

    return reply.code(httpStatus.OK).send({
        success: true,
        message: 'category_update_success',
        data: item,
    });
};

const remove = async (request, reply) => {
    const { id } = request.params;

    const findedItem = await categoryRepository.getById(id);

    if (!findedItem) {
        return reply.code(httpStatus.NOT_FOUND).send({
            success: false,
            message: 'category_not_found'
        });
    }

    const item = await categoryRepository.remove(id);

    if (!item) {
        return reply.code(httpStatus.NOT_FOUND).send({
            success: false,
            message: 'category_remove_error'
        });
    }

    return reply.code(httpStatus.OK).send({
        success: true,
        message: 'category_remove_success',
    });
};

const getAll = async (request, reply) => {
    const items = await categoryRepository.getAll();

    return reply.code(httpStatus.OK).send({
        success: true,
        data: items,
    });
};

const getById = async (request, reply) => {
    const { id } = request.params;

    const item = await categoryRepository.getById(id);

    if (!item) {
        return reply.code(httpStatus.NOT_FOUND).send({
            success: false,
            message: 'category_not_found'
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
