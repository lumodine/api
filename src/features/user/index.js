module.exports = (fastify, opts, done) => {
    fastify.register(
        require('./user.route'),
        {
            prefix: '/users',
        },
    );

    done();
};
