const Language = require('./language.model');

const create = async (payload) => {
    const language = new Language(payload);

    return await language.save();
};

const update = async (id, payload) => {
    return await Language
        .findByIdAndUpdate(
            id,
            payload,
            {
                new: true,
            }
        );
};

const remove = async (id) => {
    return await Language
        .findByIdAndUpdate(
            id,
            {
                isDeleted: true,
                deletedAt: new Date()
            }
        );
};

const getAll = async () => {
    return await Language
        .find({
            isDeleted: false
        });
};

const getById = async (id) => {
    return await Language
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
