const httpStatus = require('http-status').default;
const productRepository = require('./product.repository');

const create = async (request, reply) => {
    const {
        tenant,
        translations,
        image,
        categories,
        prices,
    } = request.body;

    const payload = {
        tenant,
        translations,
        image,
        categories,
        prices,
    };

    const item = await productRepository.create(payload);

    if (!item) {
        return reply.code(httpStatus.NOT_FOUND).send({
            success: false,
            message: 'product_create_error'
        });
    }

    return reply.code(httpStatus.OK).send({
        success: true,
        message: 'product_create_success',
        data: item,
    });
};

const update = async (request, reply) => {
    const { id } = request.params;

    const findedItem = await productRepository.getById(id);

    if (!findedItem) {
        return reply.code(httpStatus.NOT_FOUND).send({
            success: false,
            message: 'product_not_found'
        });
    }

    const {
        tenant,
        translations,
        image,
        categories,
        prices,
    } = request.body;

    const payload = {
        tenant,
        translations,
        image,
        categories,
        prices,
    };

    const item = await productRepository.update(id, payload);

    if (!item) {
        return reply.code(httpStatus.NOT_FOUND).send({
            success: false,
            message: 'product_update_error'
        });
    }

    return reply.code(httpStatus.OK).send({
        success: true,
        message: 'product_update_success',
        data: item,
    });
};

const remove = async (request, reply) => {
    const { id } = request.params;

    const findedItem = await productRepository.getById(id);

    if (!findedItem) {
        return reply.code(httpStatus.NOT_FOUND).send({
            success: false,
            message: 'product_not_found'
        });
    }

    const item = await productRepository.remove(id);

    if (!item) {
        return reply.code(httpStatus.NOT_FOUND).send({
            success: false,
            message: 'product_remove_error'
        });
    }

    return reply.code(httpStatus.OK).send({
        success: true,
        message: 'product_remove_success',
    });
};

const getAll = async (request, reply) => {
    const items = await productRepository.getAll();

    return reply.code(httpStatus.OK).send({
        success: true,
        data: items,
    });
};

const getById = async (request, reply) => {
    const { id } = request.params;

    const item = await productRepository.getById(id);

    if (!item) {
        return reply.code(httpStatus.NOT_FOUND).send({
            success: false,
            message: 'product_not_found'
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
