module.exports = (fastify, opts, done) => {
    fastify.register(
        require('./currency.route'),
        {
            prefix: '/currencies',
        },
    );

    done();
};
