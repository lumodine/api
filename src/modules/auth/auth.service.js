const { USER_PERMISSIONS } = require('../user/user.constant');
const User = require('../user/user.model');

const getProfile = async (userId) => {
    const user = await User
        .findOne({
            _id: userId,
        });

    if (!user) {
        return {
            success: false,
            message: 'user_not_found',
        };
    }

    return {
        success: true,
        data: user,
    };
};

const getProfilePermissions = async (userId) => {
    const user = await User
        .findOne(
            {
                _id: userId,
            },
            [
                'role',
            ]
        );

    if (!user) {
        return {
            success: false,
            message: 'user_not_found',
        };
    }

    return {
        success: true,
        data: USER_PERMISSIONS[user.role],
    };
};

const login = async (email, password) => {
    const user = await User
        .findOne(
            {
                email,
            },
            [
                'password',
            ]
        );

    if (!user) {
        return {
            success: false,
            message: 'incorrect_password_or_email',
        };
    }

    const isCorrectPassword = await user.comparePassword(password);

    if (!isCorrectPassword) {
        return {
            success: false,
            message: 'incorrect_password_or_email',
        };
    }

    return {
        success: true,
        data: {
            sub: user._id,
        },
    };
};

const register = async (email, name, surname, password) => {
    const hasUser = await User
        .findOne(
            {
                email,
            },
            [
                'email',
            ]
        );

    if (hasUser) {
        return {
            success: false,
            message: 'user_already_exists',
        };
    }

    const payload = {
        email,
        name,
        surname,
        password,
    };

    const user = new User(payload);

    const isSaved = await user.save();

    if (!isSaved) {
        return {
            success: false,
            data: 'user_create_error',
        };
    }

    return {
        success: true,
        data: {
            sub: user._id,
        },
    };
};

module.exports = {
    getProfile,
    getProfilePermissions,
    login,
    register,
};
