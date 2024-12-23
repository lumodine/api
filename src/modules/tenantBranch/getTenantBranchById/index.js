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
        })
        .populate('translations.language');

    if (!tenantBranch) {
        return reply.send({
            success: false,
            message: request.i18n.tenant_branch_not_found,
        });
    }

    return reply.send({
        success: true,
        data: tenantBranch,
    });
};
