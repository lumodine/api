const Category = require('../models/category.model');

const create = async (payload) => {
    const category = new Category(payload);

    return await category.save();
};

const update = async (id, payload) => {
    return await Category
        .findByIdAndUpdate(
            id,
            payload,
            {
                new: true,
            }
        );
};

const remove = async (id) => {
    return await Category
        .findByIdAndUpdate(
            id,
            {
                isDeleted: true,
                deletedAt: new Date()
            }
        );
};

const getAll = async () => {
    return await Category
        .find({
            isDeleted: false
        });
};

const getById = async (id) => {
    return await Category
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
