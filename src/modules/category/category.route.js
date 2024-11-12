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
                fastify.checkTenantIdByParams,
            ],
        },
        categoryController.create,
    );

    fastify.get(
        '/',
        {
            ...getAllCategoriesSchema,
            preHandler: [
                fastify.checkTenantIdByParams,
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
                fastify.checkTenantIdByParams,
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
                fastify.checkTenantIdByParams,
            ],
        },
        categoryController.remove,
    );

    fastify.get(
        '/:categoryId',
        {
            ...getByIdCategorySchema,
            preHandler: [
                fastify.checkTenantIdByParams,
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
                fastify.checkTenantIdByParams,
            ],
        },
        categoryController.updateSort,
    );

    done();
};
