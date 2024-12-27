module.exports = (fastify, opts, done) => {
    fastify.register(
        require('./qrMenu.route'),
        {
            prefix: '/qr-menu',
        },
    );

    done();
};
