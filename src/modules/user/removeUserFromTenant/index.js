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
            message: 'user_remove_error',
        });
    }

    return reply.send({
        success: true,
        message: 'user_remove_success',
    });
};
