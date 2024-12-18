const { PERMISSIONS } = require('../user/user.constant');
const createCategory = require('./createCategory');
const getAllCategories = require('./getAllCategories');
const updateCategory = require('./updateCategory');
const removeCategory = require('./removeCategory');
const getCategoryById = require('./getCategoryById');
const updateCategorySort = require('./updateCategorySort');
const updateCategoryStatus = require('./updateCategoryStatus');
const updateCategoryType = require('./updateCategoryType');
const uploadCategoryImage = require('./uploadCategoryImage');
const removeCategoryImage = require('./removeCategoryImage');

module.exports = (fastify, opts, done) => {
    fastify.post(
        '/',
        {
            preHandler: [
                fastify.authenticate,
                fastify.authorize(PERMISSIONS.CREATE_CATEGORY),
                fastify.checkTenantByParams,
            ],
        },
        createCategory,
    );

    fastify.get(
        '/',
        {
            preHandler: [
                fastify.authenticate,
                fastify.authorize(PERMISSIONS.GET_ALL_CATEGORIES),
                fastify.checkTenantByParams,
            ],
        },
        getAllCategories,
    );

    fastify.put(
        '/:categoryId',
        {
            preHandler: [
                fastify.authenticate,
                fastify.authorize(PERMISSIONS.UPDATE_CATEGORY),
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
                fastify.authorize(PERMISSIONS.DELETE_CATEGORY),
                fastify.checkTenantByParams,
            ],
        },
        removeCategory,
    );

    fastify.get(
        '/:categoryId',
        {
            preHandler: [
                fastify.authenticate,
                fastify.authorize(PERMISSIONS.GET_CATEGORY),
                fastify.checkTenantByParams,
            ],
        },
        getCategoryById,
    );

    fastify.put(
        '/sort',
        {
            preHandler: [
                fastify.authenticate,
                fastify.authorize(PERMISSIONS.UPDATE_CATEGORY),
                fastify.checkTenantByParams,
            ],
        },
        updateCategorySort,
    );

    fastify.put(
        '/:categoryId/status',
        {
            preHandler: [
                fastify.authenticate,
                fastify.authorize(PERMISSIONS.UPDATE_CATEGORY),
                fastify.checkTenantByParams,
            ],
        },
        updateCategoryStatus,
    );

    fastify.put(
        '/:categoryId/type',
        {
            preHandler: [
                fastify.authenticate,
                fastify.authorize(PERMISSIONS.UPDATE_CATEGORY),
                fastify.checkTenantByParams,
            ],
        },
        updateCategoryType,
    );

    fastify.post(
        '/:categoryId/upload/image',
        {
            preHandler: [
                fastify.authenticate,
                fastify.authorize(PERMISSIONS.UPDATE_CATEGORY),
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
                fastify.authorize(PERMISSIONS.UPDATE_CATEGORY),
                fastify.checkTenantByParams,
            ],
        },
        removeCategoryImage
    );

    fastify.register(
        require('../product'),
        {
            prefix: '/:categoryId',
        },
    );

    done();
};
