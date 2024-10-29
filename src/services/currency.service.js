const Currency = require('../models/currency.model');

const create = async (payload) => {
    const currency = new Currency(payload);

    return await currency.save();
};

const update = async (id, payload) => {
    return await Currency
        .findByIdAndUpdate(
            id,
            payload,
            {
                new: true,
            }
        );
};

const remove = async (id) => {
    return await Currency
        .findByIdAndUpdate(
            id,
            {
                isDeleted: true,
                deletedAt: new Date()
            }
        );
};

const getAll = async () => {
    return await Currency
        .find({
            isDeleted: false
        });
};

const getById = async (id) => {
    return await Currency
        .findOne({
            _id: id,
            isDeleted: false
        });
};

module.exports = {
    create,
    update,
    remove,
    getAll,
    getById,
};
