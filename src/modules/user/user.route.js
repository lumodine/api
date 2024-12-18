const { PERMISSIONS } = require('../user/user.constant');
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
                fastify.authorize(PERMISSIONS.CREATE_USER),
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
                fastify.authorize(PERMISSIONS.GET_ALL_USERS),
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
                fastify.authorize(PERMISSIONS.UPDATE_USER),
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
                fastify.authorize(PERMISSIONS.DELETE_USER),
                fastify.checkTenantByParams,
            ],
        },
        removeUserFromTenant
    );

    done();
};
