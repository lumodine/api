const tenantController = require('./tenant.controller');

module.exports = (fastify, opts, done) => {
    fastify.post('/', tenantController.create);

    fastify.get('/', tenantController.getAll);

    fastify.put('/:id', tenantController.update);

    fastify.delete('/:id', tenantController.remove);

    fastify.get('/:id', tenantController.getById);

    done();
};
