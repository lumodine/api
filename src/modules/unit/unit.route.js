const unitController = require('./unit.controller');

module.exports = (fastify, opts, done) => {
    fastify.post('/', unitController.create);

    fastify.get('/', unitController.getAll);

    fastify.put('/:id', unitController.update);

    fastify.delete('/:id', unitController.remove);

    fastify.get('/:id', unitController.getById);

    done();
};
