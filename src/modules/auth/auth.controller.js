const httpStatus = require('http-status').default;
const { USER_PERMISSIONS } = require('../common/user.constant');
const userRepository = require('../user/user.repository');

const me = async (request, reply) => {
    const user = await userRepository.getById(request.user.sub);

    if (!user) {
        return reply.code(httpStatus.NOT_FOUND).send({
            success: false,
            message: 'user_not_found',
        });
    }

    return reply.code(httpStatus.OK).send({
        success: true,
        data: user,
    });
};

const mePermissions = async (request, reply) => {
    const user = await userRepository.getById(request.user.sub);

    if (!user) {
        return reply.code(httpStatus.NOT_FOUND).send({
            success: false,
            message: 'user_not_found',
        });
    }

    return reply.code(httpStatus.OK).send({
        success: true,
        data: USER_PERMISSIONS[user.role],
    });
};

const login = async (request, reply) => {
    const {
        email,
        password,
    } = request.body;

    const user = await userRepository.getByEmail(email);

    if (!user) {
        return reply.code(httpStatus.OK).send({
            success: false,
            message: 'incorrect_password_or_email',
        });
    }

    const isCorrectPassword = await user.comparePassword(password);

    if (!isCorrectPassword) {
        return reply.code(httpStatus.OK).send({
            success: false,
            message: 'incorrect_password_or_email',
        });
    }

    const token = request.server.jwt.sign({
        sub: user._id,
    });

    return reply.code(httpStatus.OK).send({
        success: true,
        data: {
            token,
        },
    });
};

const register = async (request, reply) => {
    const {
        email,
        name,
        surname,
        password,
    } = request.body;

    const findedUser = await userRepository.getByEmail(email);

    if (findedUser) {
        return reply.code(httpStatus.OK).send({
            success: false,
            message: 'user_already_exists',
        });
    }

    const payload = {
        email,
        name,
        surname,
        password,
    };

    const user = await userRepository.create(payload);
    if (user) {
        const token = request.server.jwt.sign({
            sub: user._id,
        });
    
        return reply.code(httpStatus.OK).send({
            success: true,
            data: {
                token,
            },
        });
    }
    
    return reply.code(httpStatus.INTERNAL_SERVER_ERROR).send({
        success: false,
        data: 'user_create_error',
    });
};

module.exports = {
    me,
    mePermissions,
    login,
    register,
};
