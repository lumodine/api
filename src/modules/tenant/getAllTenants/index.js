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
        .populate([
            {
                path: 'languages.language',
            },
            {
                path: 'currencies.currency',
            },
        ]);

    if (tenants.length === 0) {
        return reply.send({
            success: false,
            message: request.i18n.tenants_not_found,
        });
    }

    return reply.send({
        success: true,
        data: tenants,
    });
};
