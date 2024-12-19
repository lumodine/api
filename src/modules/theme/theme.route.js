const getAllTenantColors = require('./getAllTenantColors');

module.exports = (fastify, opts, done) => {
    fastify.get(
        '/colors',
        getAllTenantColors
    );

    done();
};
