const Tenant = require('./tenant.model');

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
        .findByIdAndDelete(id);
};

const getAll = async () => {
    return await Tenant
        .find();
};

const getById = async (id) => {
    return await Tenant
        .findOne({
            _id: id,
        });
};

const getByAlias = async (alias) => {
    return await Tenant
        .findOne({
            alias,
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
