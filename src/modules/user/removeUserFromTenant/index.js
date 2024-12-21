const Tenant = require('../../tenant/tenant.model');

module.exports = async (request, reply) => {
    const {
        tenantId,
        userId,
    } = request.params;

    const updatedTenant = await Tenant.findByIdAndUpdate(tenantId, {
        $pull: {
            users: {
                user: userId,
            },
        },
    });

    if (!updatedTenant) {
        return reply.send({
            success: false,
            message: request.i18n.user_remove_this_tenant_error,
        });
    }

    return reply.send({
        success: true,
        message: request.i18n.user_remove_this_tenant_success,
    });
};
