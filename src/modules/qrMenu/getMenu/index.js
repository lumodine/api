const Tenant = require('../../tenant/tenant.model');

module.exports = async (request, reply) => {
    const tenantId = request.tenant._id;

    const tenant = await Tenant
        .findOne({
            _id: tenantId,
        }, '-qrCode -users')
        .populate('languages.language')
        .populate('currencies.currency');

    return reply.send({
        success: true,
        data: tenant,
    });
};
