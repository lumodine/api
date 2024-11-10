const tenantService = require('./tenant.service');

const create = async (request, reply) => {
    const {
        alias,
        name,
        logo,
        background,
        address,
        defaultLanguage,
        languages,
        defaultCurrency,
        currencies,
    } = request.body;
    
    const data = await tenantService.create(
        users = [
            request.user.sub,
        ],
        alias,
        name,
        logo,
        background,
        address,
        defaultLanguage,
        languages,
        defaultCurrency,
        currencies
    );

    return reply.send(data);
};

const update = async (request, reply) => {
    const { id } = request.params;

    const {
        alias,
        name,
        logo,
        background,
        address,
        defaultLanguage,
        languages,
        defaultCurrency,
        currencies,
    } = request.body;
    
    const data = await tenantService.update(
        id,
        users = [
            request.user.sub,
        ],
        alias,
        name,
        logo,
        background,
        address,
        defaultLanguage,
        languages,
        defaultCurrency,
        currencies
    );

    return reply.send(data);
};

const remove = async (request, reply) => {
    const { id } = request.params;

    const data = await tenantService.remove(id);

    return reply.send(data);
};

const getAll = async (request, reply) => {
    const user = request.user.sub;

    const data = await tenantService.getAll(user);

    return reply.send(data);
};

const getById = async (request, reply) => {
    const user = request.user.sub;

    const { id } = request.params;

    const data = await tenantService.getById(id, user);

    return reply.send(data);
};

module.exports = {
    create,
    update,
    remove,
    getAll,
    getById,
};
