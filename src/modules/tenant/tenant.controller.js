const Tenant = require('./tenant.model');
const Category = require('../category/category.model');
const Product = require('../product/product.model');
const { USER_ROLES } = require('../user/user.constant');
const { THEMES, DISALLOWED_ALIASES } = require('./tenant.constant');
const qrcode = require("@lumodine/qrcode");
const { mongoose } = require('@lumodine/mongodb');
const { s3 } = require('@lumodine/aws');
const crypto = require('@lumodine/crypto');

const create = async (request, reply) => {
    const {
        alias,
        name,
        languages,
        currencies,
    } = request.body;

    const isDisallowedAlias = DISALLOWED_ALIASES.includes(alias);

    if (isDisallowedAlias) {
        return reply.send({
            success: false,
            message: 'tenant_already_exists',
        });
    }

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
    const qrCodeBase64 = await qrcode.createTenantById(id);
    const qrCode = await s3.uploadFileFromBase64(
        qrCodeBase64,
        'image/png',
        `${id}/t/${crypto.random(32)}.png`
    );

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
        qrCode,
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

    const isDisallowedAlias = DISALLOWED_ALIASES.includes(alias);

    if (isDisallowedAlias) {
        return reply.send({
            success: false,
            message: 'tenant_already_exists',
        });
    }

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
    const tenantId = request.tenant._id;

    const [
        isRemovedTenant,
        isRemovedCategory,
        isRemovedProduct,
    ] = await Promise.all([
        Tenant.findByIdAndDelete(tenantId),
        Category.deleteMany({
            tenant: tenantId,
        }),
        Product.deleteMany({
            tenant: tenantId,
        }),
    ]);

    if (!isRemovedTenant) {
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

const uploadLogo = async (request, reply) => {
    const { tenantId } = request.params;

    const data = await request.file();
    const ext = data.filename.split('.').at(-1);
    const dataBody = await data.toBuffer();

    const url = await s3.uploadFile(
        dataBody,
        data.mimetype,
        `${tenantId}/t/${new mongoose.Types.ObjectId()}.${ext}`
    );

    const updatedTenant = await Tenant.findByIdAndUpdate(
        tenantId,
        {
            logo: url,
        },
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
    });
};

const uploadBackground = async (request, reply) => {
    const { tenantId } = request.params;

    const data = await request.file();
    const ext = data.filename.split('.').at(-1);
    const dataBody = await data.toBuffer();

    const url = await s3.uploadFile(
        dataBody,
        data.mimetype,
        `${tenantId}/t/${crypto.random(32)}.${ext}`
    );

    const updatedTenant = await Tenant.findByIdAndUpdate(
        tenantId,
        {
            background: url,
        },
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
    });
};

const removeLogo = async (request, reply) => {
    const { tenantId } = request.params;

    const updatedTenant = await Tenant.findByIdAndUpdate(
        tenantId,
        {
            logo: null,
        },
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
    });
};

const removeBackground = async (request, reply) => {
    const { tenantId } = request.params;

    const updatedTenant = await Tenant.findByIdAndUpdate(
        tenantId,
        {
            background: null,
        },
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
    uploadLogo,
    uploadBackground,
    removeLogo,
    removeBackground,
};
