const Unit = require('../models/unit.model');

const POPULATES = [
    'translations.language',
];

const create = async (payload) => {
    const unit = new Unit(payload);

    const model = unit.save();

    return model.populate(POPULATES);
};

const update = async (id, payload) => {
    return await Unit
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
        })
        .populate(POPULATES);
};

const getById = async (id) => {
    return await Unit
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
