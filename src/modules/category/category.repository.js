const Category = require('./category.model');

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
        .findByIdAndDelete(id);
};

const getAll = async () => {
    return await Category
        .find();
};

const getById = async (id) => {
    return await Category
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
