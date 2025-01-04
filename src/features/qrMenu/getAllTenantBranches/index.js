const Tenant = require('../../tenant/tenant.model');
const TenantBranch = require('../../tenantBranch/tenantBranch.model');

module.exports = async (request, reply) => {
    const tenantId = request.tenant._id;

    let tenantBranches = await TenantBranch
        .find({
            tenant: tenantId,
        })
        .populate([
            {
                path: 'translations.language',
            },
        ]);

    return reply.send({
        success: true,
        data: tenantBranches,
    });
};
