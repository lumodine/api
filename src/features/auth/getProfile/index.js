const User = require('../../user/user.model');

module.exports = async (request, reply) => {
    const { sub } = request.user;

    const user = await User.findById(sub);

    if (!user) {
        return reply.send({
            success: false,
            message: request.i18n.user_not_found,
        });
    }

    return reply.send({
        success: true,
        data: user,
    });
};
