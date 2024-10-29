const currencyController = require('../controllers/currency.controller');

module.exports = (fastify, opts) => {
    fastify.post('/', opts, currencyController.create);

    fastify.get('/', opts, currencyController.getAll);

    fastify.put('/:id', opts, currencyController.update);

    fastify.delete('/:id', opts, currencyController.remove);

    fastify.get('/:id', opts, currencyController.getById);
};
