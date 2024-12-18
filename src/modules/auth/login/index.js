const User = require('../../user/user.model');

module.exports = async (request, reply) => {
    const {
        email,
        password
    } = request.body;

    const user = await User.findOne({
        email,
    }, [
        'password'
    ]);

    if (!user) {
        return reply.send({
            success: false,
            message: 'user_not_found',
        });
    }

    const isCompoarePassword = await user.comparePassword(password);
    if (!isCompoarePassword) {
        return reply.send({
            success: false,
            message: 'incorrect_password',
        });
    }

    // TODO: move to service
    const token = request.server.jwt.sign({
        sub: user._id,
    });

    return reply.send({
        success: true,
        data: {
            token,
        },
    });
};
