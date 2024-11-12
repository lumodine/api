const Tenant = require('./tenant.model');
const { USER_ROLES } = require('../user/user.constant');

const create = async (request, reply) => {
    const {
        alias,
        name,
        logo,
        background,
        address,
        languages,
        currencies,
    } = request.body;

    const tenant = await Tenant.findOne({
        alias,
    });

    if (tenant) {
        return reply.send({
            success: false,
            message: 'tenant_already_exists',
        });
    }

    //TODO: check languages._id
    //TODO: check currencies._id

    const userId = request.user.sub;

    const payload = {
        users: [
            {
                _id: userId,
                role: USER_ROLES.TENANT_ADMIN,
            },
        ],
        alias,
        name,
        logo,
        background,
        address,
        languages,
        currencies,
    };

    const createdTenant = await (new Tenant(payload)).save();
    if (!createdTenant) {
        return reply.send({
            success: false,
            message: 'tenant_create_error',
        });
    }

    return reply.send({
        success: true,
        message: 'tenant_create_success',
    });
};

const update = async (request, reply) => {
    const { tenantId } = request.params;
    const {
        alias,
        name,
        logo,
        background,
        address,
        languages,
        currencies,
    } = request.body;

    const tenant = await Tenant.findById(tenantId);

    if (!tenant) {
        return reply.send({
            success: false,
            message: 'tenant_not_found',
        });
    }

    //TODO: check languages._id
    //TODO: check currencies._id

    const hasTenant = await Tenant.findOne({
        _id: {
            $ne: tenantId,
        },
        alias,
    });

    console.log(hasTenant);
    

    if (hasTenant) {
        return reply.send({
            success: false,
            message: 'tenant_already_exists',
        });
    }

    const payload = {
        alias,
        name,
        logo,
        background,
        address,
        languages,
        currencies,
    };

    const updatedTenant = await Tenant.findByIdAndUpdate(
        tenantId,
        payload,
        {
            new: true,
        }
    );

    if (!updatedTenant) {
        return reply.send({
            success: false,
            message: 'tenant_update_error',
        });
    }

    return reply.send({
        success: true,
        data: updatedTenant,
    });
};

const remove = async (request, reply) => {
    const { tenantId } = request.params;

    const tenant = await Tenant.findById(tenantId);

    if (!tenant) {
        return reply.send({
            success: false,
            message: 'tenant_not_found',
        });
    }

    const isRemoved = await Tenant.findByIdAndDelete(tenant._id);
    if (!isRemoved) {
        return reply.send({
            success: false,
            message: 'tenant_remove_error',
        });
    }

    return reply.send({
        success: true,
        message: 'tenant_remove_success',
    });
};

const getAll = async (request, reply) => {
    const tenants = await Tenant.find({});

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

const getById = async (request, reply) => {
    const { tenantId } = request.params;

    const tenant = await Tenant.findById(tenantId);

    if (!tenant) {
        return reply.send({
            success: false,
            message: 'tenant_not_found',
        });
    }

    return reply.send({
        success: true,
        data: tenant,
    });
};

module.exports = {
    create,
    update,
    remove,
    getAll,
    getById,
};
