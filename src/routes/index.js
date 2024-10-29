module.exports.registerAllRoutes = (fastify) => {
    fastify.register(
        require('./language.route'),
        {
            prefix: '/languages',
        },
    );

    fastify.register(
        require('./currency.route'),
        {
            prefix: '/currencies',
        },
    );

    fastify.register(
        require('./tenant.route'),
        {
            prefix: '/tenants',
        },
    );
};
