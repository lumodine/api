module.exports = (fastify, opts, done) => {
    fastify.register(
        require('./announcement.route'),
        {
            prefix: '/announcements',
        },
    );

    done();
};
