const Tenant = require('./tenant.model');
const User = require('../user/user.model');

const create = async (
    users,
    alias,
    name,
    logo,
    background,
    address,
    defaultLanguage,
    languages,
    defaultCurrency,
    currencies
) => {
    // TODO: check defaultLanguage
    // TODO: check languages
    // TODO: check defaultCurrency
    // TODO: check currencies
    const payload = {
        users,
        alias,
        name,
        logo,
        background,
        address,
        defaultLanguage,
        languages,
        defaultCurrency,
        currencies,
    };

    // TODO: check alias
    const tenant = await (new Tenant(payload)).save();

    if (!tenant) {
        return {
            success: false,
            message: 'tenant_create_error'
        };
    }

    if (users && users.length > 0) {
        await User.updateMany(
            {
                _id:{
                    $in: users,
                },
            },
            {
                $addToSet: {
                    tenants: tenant._id,
                },
            }
        );
    }

    return {
        success: true,
        message: 'tenant_create_success',
        data: tenant,
    };
};

const update = async (
    id,
    users,
    alias,
    name,
    logo,
    background,
    address,
    defaultLanguage,
    languages,
    defaultCurrency,
    currencies
) => {
    const tenant = await Tenant
        .findOne(
            {
                _id: id,
            }
        );

    if (!tenant) {
        return {
            success: false,
            message: 'tenant_not_found'
        };
    }

    // TODO: check alias
    
    if (tenant.users && tenant.users.length > 0) {
        await User.updateMany(
            {
                _id: {
                    $in: tenant.users,
                },
            },
            {
                $pull: {
                    tenants: tenant._id,
                },
            }
        );
    }

    if (users && users.length > 0) {
        await User.updateMany(
            {
                _id: {
                    $in: users,
                },
            },
            {
                $addToSet: {
                    tenants: tenant._id,
                },
            }
        );
    }

    // TODO: check defaultLanguage
    // TODO: check languages
    // TODO: check defaultCurrency
    // TODO: check currencies
    const payload = {
        users,
        alias,
        name,
        logo,
        background,
        address,
        defaultLanguage,
        languages,
        defaultCurrency,
        currencies,
    };

    const newTenant = await Tenant
        .findByIdAndUpdate(
            id,
            payload,
            {
                new: true,
            }
        );

    if (!newTenant) {
        return {
            success: false,
            message: 'tenant_update_error'
        };
    }

    return {
        success: true,
        message: 'tenant_update_success',
        data: newTenant,
    };
};

const remove = async (id) => {
    const tenant = await Tenant
        .findOne(
            {
                _id: id,
            }
        );

    if (!tenant) {
        return {
            success: false,
            message: 'tenant_not_found'
        };
    }

    if (tenant.users && tenant.users.length > 0) {
        await User.updateMany(
            {
                _id: {
                    $in: tenant.users,
                },
            },
            {
                $pull: {
                    tenants: tenant._id,
                },
            }
        );
    }

    const isRemoved = await Tenant
        .findByIdAndDelete(id);

    if (!isRemoved) {
        return {
            success: false,
            message: 'tenant_remove_error'
        };
    }

    return {
        success: true,
        message: 'tenant_remove_success',
    };
};

const getAll = async () => {
    const items = await Tenant
        .find({});

    if (items.length == 0) {
        return {
            success: false,
            message: 'tenants_not_found',
        };
    }

    return {
        success: true,
        data: items,
    };
};

const getById = async (id) => {
    const tenant = await Tenant
        .findOne(
            {
                _id: id,
            }
        );

    if (!tenant) {
        return {
            success: false,
            message: 'tenant_not_found'
        };
    }

    return {
        success: true,
        data: tenant,
    };
};

module.exports = {
    create,
    update,
    remove,
    getAll,
    getById,
};
