const languageController = require('./language.controller');

module.exports = (fastify, opts, done) => {
    fastify.post('/', languageController.create);

    fastify.get('/', languageController.getAll);

    fastify.put('/:id', languageController.update);

    fastify.delete('/:id', languageController.remove);

    fastify.get('/:id', languageController.getById);

    done();
};
