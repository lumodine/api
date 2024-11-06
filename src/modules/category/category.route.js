const categoryController = require('./category.controller');
const { PERMISSIONS } = require('../user/user.constant');
const {
    createCategorySchema,
    updateCategorySchema,
    deleteCategorySchema,
    getByIdCategorySchema,
    getAllCategoriesSchema,
} = require('./category.schema');

module.exports = (fastify, opts, done) => {
    fastify.post(
        '/',
        {
            ...createCategorySchema,
            preHandler: [
                fastify.authenticate,
                fastify.authorize(PERMISSIONS.CREATE_CATEGORY),
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
            ],
        },
        categoryController.getAll,
    );

    fastify.put(
        '/:id',
        {
            ...updateCategorySchema,
            preHandler: [
                fastify.authenticate,
                fastify.authorize(PERMISSIONS.UPDATE_CATEGORY),
            ],
        },
        categoryController.update,
    );

    fastify.delete(
        '/:id',
        {
            ...deleteCategorySchema,
            preHandler: [
                fastify.authenticate,
                fastify.authorize(PERMISSIONS.DELETE_CATEGORY),
            ],
        },
        categoryController.remove,
    );

    fastify.get(
        '/:id',
        {
            ...getByIdCategorySchema,
            preHandler: [
                fastify.authenticate,
                fastify.authorize(PERMISSIONS.GET_CATEGORY),
            ],
        },
        categoryController.getById,
    );

    done();
};
