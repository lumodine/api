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
            message: 'user_update_error',
        });
    }

    return reply.send({
        success: true,
        message: 'user_update_success',
    });
};
