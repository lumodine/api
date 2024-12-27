const { PERMISSIONS } = require('../user/user.constant');
const createTag = require('./createTag');
const updateTag = require('./updateTag');
const removeTag = require('./removeTag');

module.exports = (fastify, opts, done) => {
    fastify.post(
        '/',
        {
            preHandler: [
                fastify.authenticate,
                fastify.authorize(PERMISSIONS.TAG_CREATE),
                fastify.checkTenantByParams,
            ],
        },
        createTag
    );

    fastify.put(
        '/:tagId',
        {
            preHandler: [
                fastify.authenticate,
                fastify.authorize(PERMISSIONS.TAG_UPDATE),
                fastify.checkTenantByParams,
            ],
        },
        updateTag
    );

    fastify.delete(
        '/:tagId',
        {
            preHandler: [
                fastify.authenticate,
                fastify.authorize(PERMISSIONS.TAG_REMOVE),
                fastify.checkTenantByParams,
            ],
        },
        removeTag
    );

    done();
};
