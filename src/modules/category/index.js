module.exports = (fastify, opts, done) => {
    fastify.register(
        require('./category.route'),
        {
            prefix: '/categories',
        },
    );

    done();
};
