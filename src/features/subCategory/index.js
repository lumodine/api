module.exports = (fastify, opts, done) => {
    fastify.register(
        require('./subCategory.route'),
        {
            prefix: '/sub-categories',
        },
    );

    done();
};
