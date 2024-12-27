const TenantBranch = require('../tenantBranch.model');

module.exports = async (request, reply) => {
    const {
        tenantId,
        tenantBranchId,
    } = request.params;

    const {
        translations,
        address,
        coordinates,
    } = request.body;

    const tenantBranch = await TenantBranch
        .findOne({
            tenant: tenantId,
            _id: tenantBranchId,
        });

    if (!tenantBranch) {
        return reply.send({
            success: false,
            message: request.i18n.tenant_branch_not_found,
        });
    }

    //TODO: check translations.language

    const payload = {
        tenant: tenantId,
        translations,
        address,
        coordinates,
    };

    const updatedTenantBranch = await TenantBranch.findByIdAndUpdate(
        tenantBranchId,
        payload,
        {
            new: true,
        }
    );

    if (!updatedTenantBranch) {
        return reply.send({
            success: false,
            message: request.i18n.tenant_branch_update_error,
        });
    }

    return reply.send({
        success: true,
        message: request.i18n.tenant_branch_update_success,
    });
};
