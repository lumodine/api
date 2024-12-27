module.exports = (fastify, opts, done) => {
    fastify.register(
        require('./tenantBranch.route'),
        {
            prefix: '/branches',
        },
    );

    done();
};
