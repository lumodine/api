const userController = require('./user.controller');

module.exports = (fastify, opts, done) => {
    fastify.post('/', userController.create);

    fastify.get('/', userController.getAll);

    fastify.put('/:id', userController.update);

    fastify.delete('/:id', userController.remove);

    fastify.get('/:id', userController.getById);

    done();
};
