const tenantController = require('../controllers/tenant.controller');

module.exports = (fastify, opts) => {
    fastify.post('/', opts, tenantController.create);

    fastify.get('/', opts, tenantController.getAll);

    fastify.put('/:id', opts, tenantController.update);

    fastify.delete('/:id', opts, tenantController.remove);

    fastify.get('/:id', opts, tenantController.getById);
};
