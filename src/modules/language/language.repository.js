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
        .findByIdAndDelete(id);
};

const getAll = async () => {
    return await Language
        .find();
};

const getById = async (id) => {
    return await Language
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
