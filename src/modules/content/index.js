module.exports = (fastify, opts, done) => {
    fastify.register(
        require('./content.route'),
        {
            prefix: '/content',
        },
    );

    done();
};
