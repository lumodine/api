module.exports = (fastify, opts, done) => {
    fastify.register(
        require('./productVariant.route'),
        {
            prefix: '/product-variants',
        },
    );

    done();
};
