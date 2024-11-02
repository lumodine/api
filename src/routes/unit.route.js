const unitController = require('../controllers/unit.controller');

module.exports = (fastify, opts) => {
    fastify.post('/', opts, unitController.create);

    fastify.get('/', opts, unitController.getAll);

    fastify.put('/:id', opts, unitController.update);

    fastify.delete('/:id', opts, unitController.remove);

    fastify.get('/:id', opts, unitController.getById);
};
