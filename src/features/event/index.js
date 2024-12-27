module.exports = (fastify, opts, done) => {
    fastify.register(
        require('./event.route'),
        {
            prefix: '/events',
        },
    );

    done();
};
