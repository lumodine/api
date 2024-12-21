const Tenant = require('../../tenant/tenant.model');

module.exports = async (request, reply) => {
    const {
        tenantId,
    } = request.params;

    const { sub } = request.user;

    const tenant = await Tenant
        .findById(tenantId)
        .populate('users.user');

    const users = tenant.users.filter(user => user.user._id.toString() != sub);

    if (users.length === 0) {
        return reply.send({
            success: false,
            message: request.i18n.users_not_found,
        });
    }

    return reply.send({
        success: true,
        data: users,
    });
};
