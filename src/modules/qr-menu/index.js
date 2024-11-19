module.exports = (fastify, opts, done) => {
    fastify.register(
        require('./qr-menu.route'),
        {
            prefix: '/qr-menu',
        },
    );

    done();
};
