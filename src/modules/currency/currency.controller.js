const currencyService = require('./currency.service');

const create = async (request, reply) => {
    const {
        code,
        number,
        symbol,
    } = request.body;
    
    const data = await currencyService.create(
        code,
        number,
        symbol
    );

    return reply.send(data);
};

const update = async (request, reply) => {
    const { id } = request.params;
    
    const {
        code,
        number,
        symbol,
    } = request.body;
    
    const data = await currencyService.update(
        id,
        code,
        number,
        symbol
    );

    return reply.send(data);
};

const remove = async (request, reply) => {
    const { id } = request.params;

    const data = await currencyService.remove(id);

    return reply.send(data);
};

const getAll = async (request, reply) => {
    const data = await currencyService.getAll();

    return reply.send(data);
};

const getById = async (request, reply) => {
    const { id } = request.params;

    const data = await currencyService.getById(id);

    return reply.send(data);
};

module.exports = {
    create,
    update,
    remove,
    getAll,
    getById,
};
