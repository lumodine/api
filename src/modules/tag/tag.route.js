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
                fastify.authorize(PERMISSIONS.CREATE_TAG),
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
                fastify.authorize(PERMISSIONS.GET_ALL_TAGS),
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
                fastify.authorize(PERMISSIONS.UPDATE_TAG),
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
                fastify.authorize(PERMISSIONS.DELETE_TAG),
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
                fastify.authorize(PERMISSIONS.GET_TAG),
                fastify.checkTenantByParams,
            ],
        },
        getTagById
    );

    done();
};
