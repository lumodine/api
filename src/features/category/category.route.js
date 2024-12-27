const { PERMISSIONS } = require('../user/user.constant');
const createCategory = require('./createCategory');
const updateCategory = require('./updateCategory');
const removeCategory = require('./removeCategory');
const uploadCategoryImage = require('./uploadCategoryImage');
const removeCategoryImage = require('./removeCategoryImage');

module.exports = (fastify, opts, done) => {
    fastify.post(
        '/',
        {
            preHandler: [
                fastify.authenticate,
                fastify.authorize(PERMISSIONS.CATEGORY_CREATE),
                fastify.checkTenantByParams,
            ],
        },
        createCategory,
    );

    fastify.put(
        '/:categoryId',
        {
            preHandler: [
                fastify.authenticate,
                fastify.authorize(PERMISSIONS.CATEGORY_UPDATE),
                fastify.checkTenantByParams,
            ],
        },
        updateCategory,
    );

    fastify.delete(
        '/:categoryId',
        {
            preHandler: [
                fastify.authenticate,
                fastify.authorize(PERMISSIONS.CATEGORY_REMOVE),
                fastify.checkTenantByParams,
            ],
        },
        removeCategory,
    );

    fastify.post(
        '/:categoryId/upload/image',
        {
            preHandler: [
                fastify.authenticate,
                fastify.authorize(PERMISSIONS.CATEGORY_UPLOAD_IMAGE),
                fastify.checkTenantByParams,
            ],
        },
        uploadCategoryImage
    );

    fastify.delete(
        '/:categoryId/upload/image',
        {
            preHandler: [
                fastify.authenticate,
                fastify.authorize(PERMISSIONS.CATEGORY_REMOVE_IMAGE),
                fastify.checkTenantByParams,
            ],
        },
        removeCategoryImage
    );

    done();
};
