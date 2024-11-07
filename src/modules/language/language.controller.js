const languageService = require('./language.service');

const create = async (request, reply) => {
    const {
        name,
        shortName,
        culture,
        prefix,
        flag,
        direction,
    } = request.body;
    
    const data = await languageService.create(
        name,
        shortName,
        culture,
        prefix,
        flag,
        direction,
    );

    return reply.send(data);
};

const update = async (request, reply) => {
    const { id } = request.params;

    const {
        name,
        shortName,
        culture,
        prefix,
        flag,
        direction,
    } = request.body;
    
    const data = await languageService.update(
        id,
        name,
        shortName,
        culture,
        prefix,
        flag,
        direction
    );

    return reply.send(data);
};

const remove = async (request, reply) => {
    const { id } = request.params;

    const data = await languageService.remove(id);

    return reply.send(data);
};

const getAll = async (request, reply) => {
    const data = await languageService.getAll();

    return reply.send(data);
};

const getById = async (request, reply) => {
    const { id } = request.params;

    const data = await languageService.getById(id);

    return reply.send(data);
};

module.exports = {
    create,
    update,
    remove,
    getAll,
    getById,
};
