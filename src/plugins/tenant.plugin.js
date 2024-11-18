const fp = require('fastify-plugin');
const Tenant = require('../modules/tenant/tenant.model');

async function tenantPlugin(fastify, options) {
    fastify.decorate('checkTenantByParams', async (request, reply) => {
        const {
            tenantId,
            tenantAlias,
        } = request.params;

        let tenant = null;
        if (tenantId !== undefined) {
            tenant = await Tenant.findById(tenantId);
        } else if (tenantAlias !== undefined) {
            tenant = await Tenant.findOne({
                alias: tenantAlias,
            });
        }        

        if (!tenant) {
            return reply.send({
                success: false,
                message: 'tenant_not_found',
            });
        }

        request.tenant = tenant;
    });

    //TODO: check user permission for tenant
}

module.exports = fp(tenantPlugin);
