const productController = require('./product.controller');

module.exports = (fastify, opts, done) => {
    fastify.post('/', productController.create);

    fastify.get('/', productController.getAll);

    fastify.put('/:id', productController.update);

    fastify.delete('/:id', productController.remove);

    fastify.get('/:id', productController.getById);

    done();
};
