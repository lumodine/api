const Tenant = require('./tenant.model');
const { USER_ROLES } = require('../user/user.constant');
const { MENUS } = require('./tenant.constant');
const qrcode = require("@lumodine/qrcode");

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
    const qrCodes = await qrcode.createTenantAlias(alias);

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
        qrCodes,
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
    const {
        alias,
        name,
        logo,
        background,
        address,
        languages,
        currencies,
    } = request.body;

    //TODO: check languages._id
    //TODO: check currencies._id

    const hasTenant = await Tenant.findOne({
        _id: {
            $ne: request.tenant._id,
        },
        alias,
    });

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
    const isRemoved = await Tenant.findByIdAndDelete(request.tenant._id);
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
    const userId = request.user.sub;

    const tenants = await Tenant.find({
        users: {
            $in: [
                {
                    _id: userId,
                },
            ],
        },
    });

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
    return reply.send({
        success: true,
        data: request.tenant,
    });
};

const getMenus = async (request, reply) => {
    return reply.send({
        success: true,
        data: MENUS(request.tenant._id),
    });
};

const getQrMenu = async (request, reply) => {
    return reply.send({
        success: true,
        data: request.tenant,
    });
};

module.exports = {
    create,
    update,
    remove,
    getAll,
    getById,
    getMenus,
    getQrMenu,
};
