const currencyController = require('./currency.controller');

module.exports = (fastify, opts, done) => {
    fastify.post('/', currencyController.create);

    fastify.get('/', currencyController.getAll);

    fastify.put('/:id', currencyController.update);

    fastify.delete('/:id', currencyController.remove);

    fastify.get('/:id', currencyController.getById);

    done();
};
