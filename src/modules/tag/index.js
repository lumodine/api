module.exports = (fastify, opts, done) => {
    fastify.register(
        require('./tag.route'),
        {
            prefix: '/tags',
        },
    );

    done();
};
