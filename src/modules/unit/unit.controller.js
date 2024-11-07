const unitService = require('./unit.service');

const create = async (request, reply) => {
    const {
        tenant,
        translations,
    } = request.body;
    
    const data = await unitService.create(
        tenant,
        translations
    );

    return reply.send(data);
};

const update = async (request, reply) => {
    const { id } = request.params;
    
    const {
        tenant,
        translations,
    } = request.body;
    
    const data = await unitService.update(
        id,
        tenant,
        translations
    );

    return reply.send(data);
};

const remove = async (request, reply) => {
    const { id } = request.params;

    const data = await unitService.remove(id);

    return reply.send(data);
};

const getAll = async (request, reply) => {
    const data = await unitService.getAll();

    return reply.send(data);
};

const getById = async (request, reply) => {
    const { id } = request.params;

    const data = await unitService.getById(id);

    return reply.send(data);
};

module.exports = {
    create,
    update,
    remove,
    getAll,
    getById,
};
