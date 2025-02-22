const Tenant = require('../../tenant/tenant.model');

module.exports = async (request, reply) => {
    const tenantId = request.tenant._id;

    let tenant = await await Tenant
        .findOne({
            _id: tenantId,
        }, '-qrCode -users')
        .populate([
            {
                path: 'languages.language',
            },
            {
                path: 'currencies.currency',
            },
        ]);

    return reply.send({
        success: true,
        data: tenant,
    });
};
