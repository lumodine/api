const User = require('./user.model');

const create = async (payload) => {
    const user = new User(payload);

    return await user.save();
};

const update = async (id, payload) => {
    return await User
        .findByIdAndUpdate(
            id,
            payload,
            {
                new: true,
            }
        );
};

const remove = async (id) => {
    return await User
        .findByIdAndDelete(id);
};

const getAll = async () => {
    return await User
        .find();
};

const getById = async (id) => {
    return await User
        .findOne({
            _id: id,
        });
};

const getByEmail = async (email) => {
    return await User
        .findOne({
            email,
        });
};

module.exports = {
    create,
    update,
    remove,
    getAll,
    getById,
    getByEmail,
};
