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
            message: request.i18n.incorrect_password,
        });
    }

    const isCompoarePassword = await user.comparePassword(password);
    if (!isCompoarePassword) {
        return reply.send({
            success: false,
            message: request.i18n.incorrect_password,
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
