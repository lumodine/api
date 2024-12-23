const Tenant = require('../../tenant/tenant.model');
const TenantBranch = require('../../tenantBranch/tenantBranch.model');

module.exports = async (request, reply) => {
    const tenantId = request.tenant._id;

    let [tenant, tenantBranches] = await Promise.all([
        await Tenant
            .findOne({
                _id: tenantId,
            }, '-qrCode -users')
            .populate('languages.language')
            .populate('currencies.currency'),
        await TenantBranch
            .find({
                tenant: tenantId,
            })
            .populate('translations.language')
    ]);

    if (tenant) {
        tenant = tenant.toObject();
        tenant.branches = tenantBranches;
    }

    return reply.send({
        success: true,
        data: tenant,
    });
};
