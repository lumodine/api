module.exports = (fastify, opts, done) => {
    fastify.register(
        require('./theme.route'),
        {
            prefix: '/theme',
        },
    );

    done();
};
