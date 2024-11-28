const fp = require('fastify-plugin');
const Tenant = require('./tenant.model');

async function tenantPlugin(fastify, options) {
    fastify.decorate('checkTenantByParams', async (request, reply) => {
        const {
            tenantId,
            tenantAlias,
        } = request.params;

        const { sub } = request?.user ?? {};

        let query = {};

        if (sub !== undefined) {
            query = {
                ...query,
                'users.user': {
                    $in: [
                        sub,
                    ],
                },
            };
        }

        if (tenantId !== undefined) {
            query = {
                ...query,
                _id: tenantId,
            };
        } else if (tenantAlias !== undefined) {
            query = {
                ...query,
                alias: tenantAlias,
            };
        }

        let tenant = await Tenant.findOne(query);

        if (!tenant) {
            return reply.send({
                success: false,
                message: 'tenant_not_found',
            });
        }

        request.tenant = tenant;
    });
}

module.exports = fp(tenantPlugin);
