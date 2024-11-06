const Product = require('./product.model');

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
        .findByIdAndDelete(id);
};

const getAll = async () => {
    return await Product
        .find();
};

const getById = async (id) => {
    return await Product
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
