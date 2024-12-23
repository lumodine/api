const TenantBranch = require('../tenantBranch.model');

module.exports = async (request, reply) => {
    const {
        tenantId,
    } = request.params;

    const {
        translations,
        address,
        coordinates,
    } = request.body;

    //TODO: check translations.language

    const payload = {
        tenant: tenantId,
        translations,
        address,
        coordinates,
    };

    const createdTenantBranch = await (new TenantBranch(payload)).save();

    if (!createdTenantBranch) {
        return reply.send({
            success: false,
            message: request.i18n.tenant_branch_create_error,
        });
    }

    return reply.send({
        success: true,
        message: request.i18n.tenant_branch_create_success,
    });
};
