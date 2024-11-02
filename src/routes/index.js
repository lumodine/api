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

    fastify.register(
        require('./product.route'),
        {
            prefix: '/products',
        },
    );

    fastify.register(
        require('./category.route'),
        {
            prefix: '/categories',
        },
    );

    fastify.register(
        require('./unit.route'),
        {
            prefix: '/units',
        },
    );

    fastify.register(
        require('./user.route'),
        {
            prefix: '/users',
        },
    );
};
