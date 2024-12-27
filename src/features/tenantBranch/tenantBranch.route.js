const { PERMISSIONS } = require('../user/user.constant');
const createTenantBranch = require('./createTenantBranch');
const updateTenantBranch = require('./updateTenantBranch');
const removeTenantBranch = require('./removeTenantBranch');
const getTenantBranchById = require('./getTenantBranchById');
const getAllTenantBranches = require('./getAllTenantBranches');

module.exports = (fastify, opts, done) => {
    fastify.post(
        '/',
        {
            preHandler: [
                fastify.authenticate,
                fastify.authorize(PERMISSIONS.TENANT_BRANCH_CREATE),
                fastify.checkTenantByParams,
            ],
        },
        createTenantBranch
    );

    fastify.get(
        '/',
        {
            preHandler: [
                fastify.authenticate,
                fastify.authorize(PERMISSIONS.TENANT_BRANCH_GET_ALL),
                fastify.checkTenantByParams,
            ],
        },
        getAllTenantBranches
    );

    fastify.put(
        '/:tenantBranchId',
        {
            preHandler: [
                fastify.authenticate,
                fastify.authorize(PERMISSIONS.TENANT_BRANCH_UPDATE),
                fastify.checkTenantByParams,
            ],
        },
        updateTenantBranch
    );

    fastify.delete(
        '/:tenantBranchId',
        {
            preHandler: [
                fastify.authenticate,
                fastify.authorize(PERMISSIONS.TENANT_BRANCH_REMOVE),
                fastify.checkTenantByParams,
            ],
        },
        removeTenantBranch
    );

    fastify.get(
        '/:tenantBranchId',
        {
            preHandler: [
                fastify.authenticate,
                fastify.authorize(PERMISSIONS.TENANT_BRANCH_GET_BY_ID),
                fastify.checkTenantByParams,
            ],
        },
        getTenantBranchById
    );

    done();
};
