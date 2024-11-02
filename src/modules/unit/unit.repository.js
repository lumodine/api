const Unit = require('./unit.model');

const create = async (payload) => {
    const unit = new Unit(payload);

    return await unit.save();
};

const update = async (id, payload) => {
    return await Unit
        .findByIdAndUpdate(
            id,
            payload,
            {
                new: true,
            }
        );
};

const remove = async (id) => {
    return await Unit
        .findByIdAndUpdate(
            id,
            {
                isDeleted: true,
                deletedAt: new Date()
            }
        );
};

const getAll = async () => {
    return await Unit
        .find({
            isDeleted: false
        });
};

const getById = async (id) => {
    return await Unit
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
