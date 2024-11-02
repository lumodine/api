module.exports = (fastify, opts, done) => {
    fastify.register(
        require('./product.route'),
        {
            prefix: '/products',
        },
    );

    done();
};
