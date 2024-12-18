const Tenant = require('../tenant.model');

module.exports = async (request, reply) => {
    const tenantId = request.tenant._id;
    const { sub } = request.user;

    const tenant = await Tenant
        .findOne(
            {
                _id: tenantId,
                'users.user': {
                    $in: [
                        sub,
                    ],
                },
            }
        )
        .populate('languages.language')
        .populate('currencies.currency');

    return reply.send({
        success: true,
        data: tenant,
    });
};
