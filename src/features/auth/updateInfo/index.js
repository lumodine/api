const User = require('../../user/user.model');

module.exports = async (request, reply) => {
    const { sub } = request.user;

    const {
        name,
        surname,
    } = request.body;

    const user = await User.findById(sub);

    if (!user) {
        return reply.send({
            success: false,
            message: request.i18n.user_not_found,
        });
    }

    const payload = {
        name,
        surname,
    };

    const updatedUser = await User.findByIdAndUpdate(
        user._id,
        payload,
        {
            new: true,
        }
    );

    if (!updatedUser) {
        return reply.send({
            success: false,
            message: request.i18n.user_info_update_error,
        });
    }

    return reply.send({
        success: true,
        message: request.i18n.user_info_update_success,
    });
};
