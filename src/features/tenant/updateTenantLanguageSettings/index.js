const Tenant = require('../tenant.model');

module.exports = async (request, reply) => {
    const {
        tenantId,
    } = request.params;
    const {
        languages,
    } = request.body;

    const payload = {
        languages,
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
            message: request.i18n.tenant_language_update_error,
        });
    }

    return reply.send({
        success: true,
        message: request.i18n.tenant_language_update_success,
    });
};
