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
        })
        .populate('languages')
        .populate('currencies');
};

const getById = async (id) => {
    return await Tenant
        .findOne({
            _id: id,
            isDeleted: false
        })
        .populate('languages')
        .populate('currencies');
};

module.exports = {
    create,
    update,
    remove,
    getAll,
    getById,
};
