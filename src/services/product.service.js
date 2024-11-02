const Product = require('../models/product.model');

const POPULATES = [
    'translations.language',
    'categories',
    'prices.currency',
    'prices.unit',
];

const create = async (payload) => {
    const product = new Product(payload);

    const model = await product.save();

    return model.populate(POPULATES);
};

const update = async (id, payload) => {
    return await Product
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
        })
        .populate(POPULATES);
};

const getById = async (id) => {
    return await Product
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
