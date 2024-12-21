const Tenant = require('../tenant.model');
const { DISALLOWED_ALIASES } = require('../tenant.constant');

module.exports = async (request, reply) => {
    const {
        tenantId,
    } = request.params;
    const {
        name,
        alias,
        status,
    } = request.body;

    const isDisallowedAlias = DISALLOWED_ALIASES.includes(alias);

    if (isDisallowedAlias) {
        return reply.send({
            success: false,
            message: request.i18n.tenant_already_exists,
        });
    }

    const hasTenant = await Tenant.findOne({
        _id: {
            $ne: tenantId,
        },
        alias,
    });

    if (hasTenant) {
        return reply.send({
            success: false,
            message: request.i18n.tenant_already_exists,
        });
    }

    const payload = {
        name,
        alias,
        status,
    };

    const updatedTenant = await Tenant.findByIdAndUpdate(
        tenantId,
        payload,
        {
            new: true,
        }
    );

    if (!updatedTenant) {
        return reply.send({
            success: false,
            message: request.i18n.tenant_settings_update_error,
        });
    }

    return reply.send({
        success: true,
        message: request.i18n.tenant_settings_update_success,
        data: updatedTenant,
    });
};
