const User = require('../../user/user.model');

module.exports = async (request, reply) => {
    const {
        email,
        name,
        surname,
        password,
        confirmPassword
    } = request.body;

    if (password != confirmPassword) {
        return reply.send({
            success: false,
            message: 'passwords_does_not_match',
        });
    }

    const user = await User.findOne({
        email,
    });

    if (user) {
        return reply.send({
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

    const createdUser = await (new User(payload)).save();

    if (!createdUser) {
        return reply.send({
            success: false,
            message: 'user_create_error',
        });
    }

    // TODO: move to service
    const token = request.server.jwt.sign({
        sub: createdUser._id,
    });

    return reply.send({
        success: true,
        data: {
            token,
        },
    });
};
