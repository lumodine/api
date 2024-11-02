module.exports = (fastify, opts, done) => {
    fastify.register(
        require('./tenant.route'),
        {
            prefix: '/tenants',
        },
    );

    done();
};
