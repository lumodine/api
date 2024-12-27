const TenantBranch = require('../tenantBranch.model');

module.exports = async (request, reply) => {
    const {
        tenantId,
    } = request.params;
    
    const tenantBranches = await TenantBranch
        .find({
            tenant: tenantId,
        }).sort({
            sort: 1
        })
        .populate([
            {
                path: 'translations.language',
            },
        ]);

    if (tenantBranches.length === 0) {
        return reply.send({
            success: false,
            message: request.i18n.tenant_branches_not_found,
        });
    }

    return reply.send({
        success: true,
        data: tenantBranches,
    });
};
