const User = require('./user.model');

const create = async (email, name, surname, password, role) => {
    const payload = {
        email,
        name,
        surname,
        password,
        role,
    };

    const user = await (new User(payload)).save();

    if (!user) {
        return {
            success: false,
            message: 'user_create_error'
        };
    }

    return {
        success: true,
        message: 'user_create_success',
        data: user,
    };
};

const update = async (id, email, name, surname, password, role) => {
    const hasUser = await User
        .findOne(
            {
                _id: id,
            }
        );

    if (!hasUser) {
        return {
            success: false,
            message: 'user_not_found'
        };
    }

    const payload = {
        email,
        name,
        surname,
        password,
        role,
    };

    const newUser = await User
        .findByIdAndUpdate(
            id,
            payload,
            {
                new: true,
            }
        );

    if (!newUser) {
        return {
            success: false,
            message: 'user_update_error'
        };
    }

    return {
        success: true,
        message: 'user_update_success',
        data: newUser,
    };
};

const remove = async (id) => {
    const hasUser = await User
        .findOne(
            {
                _id: id,
            }
        );

    if (!hasUser) {
        return {
            success: false,
            message: 'user_not_found'
        };
    }

    const isRemoved = await User
        .findByIdAndDelete(id);

    if (!isRemoved) {
        return {
            success: false,
            message: 'user_remove_error'
        };
    }

    return {
        success: true,
        message: 'user_remove_success',
    };
};

const getAll = async () => {
    const items = await User
        .find({});

    if (items.length == 0) {
        return {
            success: false,
            message: 'users_not_found',
        };
    }

    return {
        success: true,
        data: items,
    };
};

const getById = async (id) => {
    const user = await User
        .findOne(
            {
                _id: id,
            }
        );

    if (!user) {
        return {
            success: false,
            message: 'user_not_found'
        };
    }

    return {
        success: true,
        data: user,
    };
};

module.exports = {
    create,
    update,
    remove,
    getAll,
    getById,
};
