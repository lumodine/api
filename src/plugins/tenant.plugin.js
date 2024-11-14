const fp = require('fastify-plugin');
const Tenant = require('../modules/tenant/tenant.model');

async function tenantPlugin(fastify, options) {
    fastify.decorate('checkTenantIdByParams', async (request, reply) => {
        const { tenantId } = request.params;

        const tenant = await Tenant.findById(tenantId);

        if (!tenant) {
            return reply.send({
                success: false,
                message: 'tenant_not_found',
            });
        }

        request.tenant = tenant;
    });

    //TODO: check tenant by alias

    //TODO: check user permission for tenant
}

module.exports = fp(tenantPlugin);
