module.exports = (fastify, opts, done) => {
    fastify.register(
        require('./language.route'),
        {
            prefix: '/languages',
        },
    );

    done();
};
