const categoryController = require('../controllers/category.controller');

module.exports = (fastify, opts) => {
    fastify.post('/', opts, categoryController.create);

    fastify.get('/', opts, categoryController.getAll);

    fastify.put('/:id', opts, categoryController.update);

    fastify.delete('/:id', opts, categoryController.remove);

    fastify.get('/:id', opts, categoryController.getById);
};
