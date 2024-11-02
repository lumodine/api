const Product = require('../models/product.model');

const create = async (payload) => {
    const product = new Product(payload);

    return await product.save();
};

const update = async (id, payload) => {
    return await Product
        .findByIdAndUpdate(
            id,
            payload,
            {
                new: true,
            }
        );
};

const remove = async (id) => {
    return await Product
        .findByIdAndUpdate(
            id,
            {
                isDeleted: true,
                deletedAt: new Date()
            }
        );
};

const getAll = async () => {
    return await Product
        .find({
            isDeleted: false
        });
};

const getById = async (id) => {
    return await Product
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
