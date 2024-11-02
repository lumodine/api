module.exports = (fastify, opts, done) => {
    fastify.register(
        require('./unit.route'),
        {
            prefix: '/units',
        },
    );

    done();
};
