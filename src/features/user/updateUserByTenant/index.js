const Tenant = require('../../tenant/tenant.model');

module.exports = async (request, reply) => {
    const {
        tenantId,
        userId,
    } = request.params;

    const {
        role,
    } = request.body;

    const updatedTenant = await Tenant.findOneAndUpdate(
        {
            _id: tenantId,
            'users.user': userId,
        },
        {
            $set: {
                'users.$.role': role,
            },
        });

    if (!updatedTenant) {
        return reply.send({
            success: false,
            message: request.i18n.user_update_this_tenant_error,
        });
    }

    return reply.send({
        success: true,
        message: request.i18n.user_update_this_tenant_success,
    });
};
