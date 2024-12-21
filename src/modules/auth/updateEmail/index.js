const User = require('../../user/user.model');

module.exports = async (request, reply) => {
    const { sub } = request.user;

    const {
        email,
    } = request.body;

    const user = await User.findById(sub);

    if (!user) {
        return reply.send({
            success: false,
            message: request.i18n.user_not_found,
        });
    }

    const hasUserEmail = await User.findOne({
        _id: {
            $ne: user._id,
        },
        email,
    });

    if (hasUserEmail) {
        return reply.send({
            success: false,
            message: request.i18n.user_already_exists,
        });
    }

    const payload = {
        email,
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
            message: request.i18n.user_email_update_error,
        });
    }

    return reply.send({
        success: true,
        message: request.i18n.user_email_update_success,
    });
};
