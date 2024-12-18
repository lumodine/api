const Tenant = require('../../tenant/tenant.model');
const User = require('../user.model');

module.exports = async (request, reply) => {
    const {
        tenantId,
    } = request.params;

    const {
        email,
        role,
    } = request.body;

    const user = await User.findOne({
        email,
    });

    if (!user) {
        return reply.send({
            success: false,
            message: 'user_not_found',
        });
    }

    const hasUserInTenant = await Tenant.findOne({
        _id: tenantId,
        'users.user': {
            $in: user._id,
        },
    });

    if (hasUserInTenant) {
        return reply.send({
            success: false,
            message: 'user_already_exists_this_tenant',
        });
    }

    const updatedTenant = await Tenant.findByIdAndUpdate(tenantId, {
        $push: {
            users: {
                user: user._id,
                role,
            },
        },
    });

    if (!updatedTenant) {
        return reply.send({
            success: false,
            message: 'user_create_error',
        });
    }

    return reply.send({
        success: true,
        message: 'user_create_success',
    });
};
