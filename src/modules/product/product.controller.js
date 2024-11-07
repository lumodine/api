const productService = require('./product.service');

const create = async (request, reply) => {
    const {
        tenant,
        translations,
        image,
        categories,
        prices,
    } = request.body;
    
    const data = await productService.create(
        tenant,
        translations,
        image,
        categories,
        prices,
    );

    return reply.send(data);
};

const update = async (request, reply) => {
    const { id } = request.params;

    const {
        tenant,
        translations,
        image,
        categories,
        prices,
    } = request.body;
    
    const data = await productService.update(
        id,
        tenant,
        translations,
        image,
        categories,
        prices
    );

    return reply.send(data);
};

const remove = async (request, reply) => {
    const { id } = request.params;

    const data = await productService.remove(id);

    return reply.send(data);
};

const getAll = async (request, reply) => {
    const data = await productService.getAll();

    return reply.send(data);
};

const getById = async (request, reply) => {
    const { id } = request.params;

    const data = await productService.getById(id);

    return reply.send(data);
};

module.exports = {
    create,
    update,
    remove,
    getAll,
    getById,
};
