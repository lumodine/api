const Currency = require('./currency.model');

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
        .findByIdAndDelete(id);
};

const getAll = async () => {
    return await Currency
        .find();
};

const getById = async (id) => {
    return await Currency
        .findOne({
            _id: id,
        });
};

module.exports = {
    create,
    update,
    remove,
    getAll,
    getById,
};
