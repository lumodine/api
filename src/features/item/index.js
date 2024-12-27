module.exports = (fastify, opts, done) => {
    fastify.register(
        require('./item.route'),
        {
            prefix: '/items',
        },
    );

    done();
};
