const Tenant = require('../tenant.model');

module.exports = async (request, reply) => {
    const {
        tenantId,
    } = request.params;
    const {
        color,
    } = request.body;

    const payload = {
        theme: {
            color,
        },
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
            message: request.i18n.tenant_theme_color_update_error,
        });
    }

    return reply.send({
        success: true,
        message: request.i18n.tenant_theme_color_update_success,
    });
};
