const userController = require('../controllers/user.controller');

module.exports = (fastify, opts) => {
    fastify.post('/', opts, userController.create);

    fastify.get('/', opts, userController.getAll);

    fastify.put('/:id', opts, userController.update);

    fastify.delete('/:id', opts, userController.remove);

    fastify.get('/:id', opts, userController.getById);
};
