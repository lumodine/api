const Tenant = require('../tenant.model');

module.exports = async (request, reply) => {
    const { tenantId } = request.params;

    const updatedTenant = await Tenant.findByIdAndUpdate(
        tenantId,
        {
            logo: null,
        },
        {
            new: true,
        }
    );

    if (!updatedTenant) {
        return reply.send({
            success: false,
            message: 'tenant_update_error',
        });
    }

    return reply.send({
        success: true,
        message: 'tenant_update_success',
    });
};
