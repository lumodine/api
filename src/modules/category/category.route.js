const categoryController = require('./category.controller');
const { PERMISSIONS } = require('../user/user.constant');
const {
    createCategorySchema,
    updateCategorySchema,
    deleteCategorySchema,
    getByIdCategorySchema,
    getAllCategoriesSchema,
    updateCategorySortSchema,
} = require('./category.schema');

module.exports = (fastify, opts, done) => {
    fastify.post(
        '/',
        {
            ...createCategorySchema,
            preHandler: [
                fastify.authenticate,
                fastify.authorize(PERMISSIONS.CREATE_CATEGORY),
                fastify.checkTenantByParams,
            ],
        },
        categoryController.create,
    );

    fastify.get(
        '/',
        {
            ...getAllCategoriesSchema,
            preHandler: [
                fastify.authenticate,
                fastify.authorize(PERMISSIONS.GET_ALL_CATEGORIES),
                fastify.checkTenantByParams,
            ],
        },
        categoryController.getAll,
    );

    fastify.put(
        '/:categoryId',
        {
            ...updateCategorySchema,
            preHandler: [
                fastify.authenticate,
                fastify.authorize(PERMISSIONS.UPDATE_CATEGORY),
                fastify.checkTenantByParams,
            ],
        },
        categoryController.update,
    );

    fastify.delete(
        '/:categoryId',
        {
            ...deleteCategorySchema,
            preHandler: [
                fastify.authenticate,
                fastify.authorize(PERMISSIONS.DELETE_CATEGORY),
                fastify.checkTenantByParams,
            ],
        },
        categoryController.remove,
    );

    fastify.get(
        '/:categoryId',
        {
            ...getByIdCategorySchema,
            preHandler: [
                fastify.authenticate,
                fastify.authorize(PERMISSIONS.GET_CATEGORY),
                fastify.checkTenantByParams,
            ],
        },
        categoryController.getById,
    );

    fastify.put(
        '/sort',
        {
            ...updateCategorySortSchema,
            preHandler: [
                fastify.authenticate,
                fastify.authorize(PERMISSIONS.UPDATE_CATEGORY),
                fastify.checkTenantByParams,
            ],
        },
        categoryController.updateSort,
    );

    done();
};
