const fp = require('fastify-plugin');
const Tenant = require('./tenant.model');
const { DISALLOWED_ALIASES, TENANT_ALIAS_MIN_LENGTH } = require('./tenant.constant');

async function tenantPlugin(fastify, options) {
    fastify.decorate('validateTenantAlias', (request, reply, done) => {
        const { alias } = request.body;

        if (alias.length < TENANT_ALIAS_MIN_LENGTH) {
            return reply.send({
                success: false,
                message: request.i18n.tenant_alias_too_short.replace('{min}', TENANT_ALIAS_MIN_LENGTH),
            });
        }

        if (!/^[a-zA-Z0-9_-]+$/.test(alias)) {
            return reply.send({
                success: false,
                message: request.i18n.tenant_alias_invalid,
            });
        }

        const isDisallowedAlias = DISALLOWED_ALIASES.includes(alias.toLowerCase());

        if (isDisallowedAlias) {
            return reply.send({
                success: false,
                message: request.i18n.tenant_alias_invalid,
            });
        }

        done();
    });

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
                    $in: sub,
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
                message: request.i18n.tenant_not_found,
            });
        }

        request.tenant = tenant;
    });
}

module.exports = fp(tenantPlugin);
