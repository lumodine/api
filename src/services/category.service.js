const Category = require('../models/category.model');

const POPULATES = [
    'translations.language',
];

const create = async (payload) => {
    const category = new Category(payload);

    const model = await category.save();

    return model.populate(POPULATES);
};

const update = async (id, payload) => {
    return await Category
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
        })
        .populate(POPULATES);
};

const getById = async (id) => {
    return await Category
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
