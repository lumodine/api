const Tenant = require('../tenant.model');

module.exports = async (request, reply) => {
    const {
        tenantId,
    } = request.params;

    const {
        font,
    } = request.body;

    const payload = {
        'theme.font': font,
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
            message: request.i18n.tenant_theme_font_update_error,
        });
    }

    return reply.send({
        success: true,
        message: request.i18n.tenant_theme_font_update_success,
    });
};
