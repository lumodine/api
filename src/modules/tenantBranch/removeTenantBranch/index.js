const TenantBranch = require('../tenantBranch.model');

module.exports = async (request, reply) => {
    const {
        tenantId,
        tenantBranchId,
    } = request.params;

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

    const isRemoved = await TenantBranch.findByIdAndDelete(tenantBranch._id);
    if (!isRemoved) {
        return reply.send({
            success: false,
            message: request.i18n.tenant_branch_remove_error,
        });
    }

    return reply.send({
        success: true,
        message: request.i18n.tenant_branch_remove_success,
    });
};
