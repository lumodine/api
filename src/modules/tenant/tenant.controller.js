const Tenant = require('./tenant.model');
const { USER_ROLES } = require('../user/user.constant');
const { THEMES } = require('./tenant.constant');
const qrcode = require("@lumodine/qrcode");
const { mongoose } = require('@lumodine/mongodb');

const create = async (request, reply) => {
    const {
        alias,
        name,
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

    //TODO: check languages.language
    //TODO: check currencies.currency

    const id = new mongoose.Types.ObjectId();
    const { sub } = request.user;
    const qrCodes = await qrcode.createTenantById(id);

    const payload = {
        _id: id,
        users: [
            {
                user: sub,
                role: USER_ROLES.TENANT_ADMIN,
            },
        ],
        alias,
        name,
        languages,
        currencies,
        qrCodes,
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
        data: createdTenant,
    });
};

const updateSettings = async (request, reply) => {
    const {
        tenantId,
    } = request.params;
    const {
        name,
        alias,
        address,
    } = request.body;

    const hasTenant = await Tenant.findOne({
        _id: {
            $ne: tenantId,
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
        name,
        alias,
        address,
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
        message: 'tenant_update_success',
        data: updatedTenant,
    });
};

const updateLanguageSettings = async (request, reply) => {
    const {
        tenantId,
    } = request.params;
    const {
        languages,
    } = request.body;

    const payload = {
        languages,
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
        message: 'tenant_update_success',
        data: updatedTenant,
    });
};

const updateCurrencySettings = async (request, reply) => {
    const {
        tenantId,
    } = request.params;
    const {
        currencies,
    } = request.body;

    const payload = {
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
        message: 'tenant_update_success',
        data: updatedTenant,
    });
};

const updateTheme = async (request, reply) => {
    const {
        tenantId,
    } = request.params;
    const {
        theme,
    } = request.body;

    const payload = {
        theme,
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
        message: 'tenant_update_success',
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
    const { sub } = request.user;

    const tenants = await Tenant
        .find(
            {
                'users.user': {
                    $in: [
                        sub,
                    ],
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

const getById = async (request, reply) => {
    const tenantId = request.tenant._id;
    const { sub } = request.user;

    console.log(tenantId);
    

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

const getAliasById = async (request, reply) => {
    return reply.send({
        success: true,
        data: request.tenant.alias,
    });
};

const getAllThemes = async (request, reply) => {
    const themes = Object.values(THEMES);

    return reply.send({
        success: true,
        data: themes,
    });
};

module.exports = {
    create,
    updateSettings,
    updateLanguageSettings,
    updateCurrencySettings,
    updateTheme,
    remove,
    getAll,
    getById,
    getAliasById,
    getAllThemes,
};
