const languageController = require('../controllers/language.controller');

module.exports = (fastify, opts) => {
    fastify.post('/', opts, languageController.create);

    fastify.get('/', opts, languageController.getAll);

    fastify.put('/:id', opts, languageController.update);

    fastify.delete('/:id', opts, languageController.remove);

    fastify.get('/:id', opts, languageController.getById);
};
