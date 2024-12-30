const { PERMISSIONS } = require('../user/user.constant');
const updateSubCategory = require('./updateSubCategory');
const removeSubCategory = require('./removeSubCategory');

module.exports = (fastify, opts, done) => {
    fastify.put(
        '/:subCategoryId',
        {
            preHandler: [
                fastify.authenticate,
                fastify.authorize(PERMISSIONS.SUB_CATEGORY_UPDATE),
                fastify.checkTenantByParams,
            ],
        },
        updateSubCategory,
    );

    fastify.delete(
        '/:subCategoryId',
        {
            preHandler: [
                fastify.authenticate,
                fastify.authorize(PERMISSIONS.SUB_CATEGORY_REMOVE),
                fastify.checkTenantByParams,
            ],
        },
        removeSubCategory,
    );

    done();
};
