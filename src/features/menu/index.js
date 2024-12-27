module.exports = (fastify, opts, done) => {
    fastify.register(
        require('./menu.route'),
        {
            prefix: '/menu',
        },
    );

    done();
};
