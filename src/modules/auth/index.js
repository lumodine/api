module.exports = (fastify, opts, done) => {
    fastify.register(
        require('./auth.route'),
        {
            prefix: '/auth',
        },
    );

    done();
};
