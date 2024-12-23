const { PERMISSIONS } = require('../user/user.constant');
const createTag = require('./createTag');
const updateTag = require('./updateTag');
const removeTag = require('./removeTag');
const getTagById = require('./getTagById');
const getAllTags = require('./getAllTags');

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

    fastify.get(
        '/',
        {
            preHandler: [
                fastify.authenticate,
                fastify.authorize(PERMISSIONS.TAG_GET_ALL),
                fastify.checkTenantByParams,
            ],
        },
        getAllTags
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

    fastify.get(
        '/:tagId',
        {
            preHandler: [
                fastify.authenticate,
                fastify.authorize(PERMISSIONS.TAG_GET_BY_ID),
                fastify.checkTenantByParams,
            ],
        },
        getTagById
    );

    done();
};
