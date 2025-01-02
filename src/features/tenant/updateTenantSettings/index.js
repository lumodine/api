const Tenant = require('../tenant.model');

module.exports = async (request, reply) => {
    const {
        tenantId,
    } = request.params;

    const {
        name,
        alias,
        status,
    } = request.body;

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
    });
};
