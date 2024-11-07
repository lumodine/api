const userService = require('./user.service');

const create = async (request, reply) => {
    const {
        email,
        name,
        surname,
        password,
        role,
    } = request.body;
    
    const data = await userService.create(
        tenant,
        translations
    );

    return reply.send(data);
};

const update = async (request, reply) => {
    const { id } = request.params;
    
    const {
        email,
        name,
        surname,
        password,
        role,
    } = request.body;
    
    const data = await userService.update(
        id,
        email,
        name,
        surname,
        password,
        role
    );

    return reply.send(data);
};

const remove = async (request, reply) => {
    const { id } = request.params;

    const data = await userService.remove(id);

    return reply.send(data);
};

const getAll = async (request, reply) => {
    const data = await userService.getAll();

    return reply.send(data);
};

const getById = async (request, reply) => {
    const { id } = request.params;

    const data = await userService.getById(id);

    return reply.send(data);
};

module.exports = {
    create,
    update,
    remove,
    getAll,
    getById,
};
