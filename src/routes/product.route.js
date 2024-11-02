const productController = require('../controllers/product.controller');

module.exports = (fastify, opts) => {
    fastify.post('/', opts, productController.create);

    fastify.get('/', opts, productController.getAll);

    fastify.put('/:id', opts, productController.update);

    fastify.delete('/:id', opts, productController.remove);

    fastify.get('/:id', opts, productController.getById);
};
