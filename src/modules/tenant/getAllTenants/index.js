const Tenant = require('../tenant.model');

module.exports = async (request, reply) => {
    const { sub } = request.user;

    const tenants = await Tenant
        .find(
            {
                'users.user': {
                    $in: sub,
                },
            }
        )
        .populate('languages.language')
        .populate('currencies.currency');

    if (tenants.length === 0) {
        return reply.send({
            success: false,
            message: 'tenants_not_found',
        });
    }

    return reply.send({
        success: true,
        data: tenants,
    });
};
