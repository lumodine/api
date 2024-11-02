const Tenant = require('../models/tenant.model');

const create = async (payload) => {
    const tenant = new Tenant(payload);

    return await tenant.save();
};

const update = async (id, payload) => {
    return await Tenant
        .findByIdAndUpdate(
            id,
            payload,
            {
                new: true,
            }
        );
};

const remove = async (id) => {
    return await Tenant
        .findByIdAndUpdate(
            id,
            {
                isDeleted: true,
                deletedAt: new Date()
            }
        );
};

const getAll = async () => {
    return await Tenant
        .find({
            isDeleted: false
        });
};

const getById = async (id) => {
    return await Tenant
        .findOne({
            _id: id,
            isDeleted: false
        });
};

const getByAlias = async (alias) => {
    return await Tenant
        .findOne({
            alias,
            isDeleted: false
        });
};

module.exports = {
    create,
    update,
    remove,
    getAll,
    getById,
    getByAlias,
};
