const Tenant = require('../tenant/tenant.model');
const User = require('./user.model');

const create = async (request, reply) => {
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

const update = async (request, reply) => {
    const {
        tenantId,
        userId,
    } = request.params;

    const {
        role,
    } = request.body;

    const updatedTenant = await Tenant.findByIdAndUpdate(tenantId, {
        $set: {
            users: {
                user: userId,
                role,
            },
        },
    });

    if (!updatedTenant) {
        return reply.send({
            success: false,
            message: 'user_update_error',
        });
    }

    return reply.send({
        success: true,
        message: 'user_update_success',
    });
};

const remove = async (request, reply) => {
    const {
        tenantId,
        userId,
    } = request.params;

    const updatedTenant = await Tenant.findByIdAndUpdate(tenantId, {
        $pull: {
            users: {
                user: userId,
            },
        },
    });

    if (!updatedTenant) {
        return reply.send({
            success: false,
            message: 'user_remove_error',
        });
    }

    return reply.send({
        success: true,
        message: 'user_remove_success',
    });
};

const getAll = async (request, reply) => {
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
            message: 'users_not_found',
        });
    }

    return reply.send({
        success: true,
        data: users,
    });
};

module.exports = {
    create,
    update,
    remove,
    getAll,
};
