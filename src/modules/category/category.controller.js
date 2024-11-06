const categoryService = require('./category.service');

const create = async (request, reply) => {
    const {
        tenant,
        translations,
        image,
    } = request.body;

    const data = await categoryService.create(
        tenant,
        translations,
        image
    );

    return reply.send(data);
};

const update = async (request, reply) => {
    const { id } = request.params;

    const {
        tenant,
        translations,
        image,
    } = request.body;

    const data = await categoryService.update(
        id,
        tenant,
        translations,
        image
    );

    return reply.send(data);
};

const remove = async (request, reply) => {
    const { id } = request.params;

    const data = await categoryService.remove(id);

    return reply.send(data);
};

const getAll = async (request, reply) => {
    const data = await categoryService.getAll();

    return reply.send(data);
};

const getById = async (request, reply) => {
    const { id } = request.params;

    const data = await categoryService.getById(id);

    return reply.send(data);
};

module.exports = {
    create,
    update,
    remove,
    getAll,
    getById,
};
