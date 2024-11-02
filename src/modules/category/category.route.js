const categoryController = require('./category.controller');

module.exports = (fastify, opts, done) => {
    fastify.post('/', categoryController.create);

    fastify.get('/', categoryController.getAll);

    fastify.put('/:id', categoryController.update);

    fastify.delete('/:id', categoryController.remove);

    fastify.get('/:id', categoryController.getById);

    done();
};
