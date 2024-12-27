const { PERMISSIONS } = require('./user.constant');
const addUserToTenant = require('./addUserToTenant');
const getAllUsersByTenant = require('./getAllUsersByTenant');
const updateUserByTenant = require('./updateUserByTenant');
const removeUserFromTenant = require('./removeUserFromTenant');

module.exports = (fastify, opts, done) => {
    fastify.post(
        '/',
        {
            preHandler: [
                fastify.authenticate,
                fastify.authorize(PERMISSIONS.USER_ADD_TO_TENANT),
                fastify.checkTenantByParams,
            ],
        },
        addUserToTenant
    );

    fastify.get(
        '/',
        {
            preHandler: [
                fastify.authenticate,
                fastify.authorize(PERMISSIONS.USER_GET_ALL_BY_TENANT),
                fastify.checkTenantByParams,
            ],
        },
        getAllUsersByTenant
    );

    fastify.put(
        '/:userId',
        {
            preHandler: [
                fastify.authenticate,
                fastify.authorize(PERMISSIONS.USER_UPDATE_BY_TENANT),
                fastify.checkTenantByParams,
            ],
        },
        updateUserByTenant
    );

    fastify.delete(
        '/:userId',
        {
            preHandler: [
                fastify.authenticate,
                fastify.authorize(PERMISSIONS.USER_REMOVE_FROM_TENANT),
                fastify.checkTenantByParams,
            ],
        },
        removeUserFromTenant
    );

    done();
};
