const Tenant = require('../models/tenant.model');

const POPULATES = [
    'defaultLanguage',
    'languages',
    'defaultCurrency',
    'currencies'
];

const create = async (payload) => {
    const tenant = new Tenant(payload);

    const model = await tenant.save();

    return model.populate(POPULATES);
};

const update = async (id, payload) => {
    return await Tenant
        .findByIdAndUpdate(
            id,
            payload,
            {
                new: true,
            }
        )
        .populate(POPULATES);
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
        .populate(POPULATES);
};

const getById = async (id) => {
    return await Tenant
        .findOne({
            _id: id,
            isDeleted: false
        })
        .populate(POPULATES);
};

module.exports = {
    create,
    update,
    remove,
    getAll,
    getById,
};
