const User = require('../../user/user.model');

module.exports = async (request, reply) => {
    const { sub } = request.user;

    const {
        currentPassword,
        newPassword,
        confirmNewPassword,
    } = request.body;

    if (newPassword != confirmNewPassword) {
        return reply.send({
            success: false,
            message: request.i18n.passwords_does_not_match,
        });
    }

    const user = await User.findById(
        sub,
        [
            'password'
        ]);

    if (!user) {
        return reply.send({
            success: false,
            message: request.i18n.user_not_found,
        });
    }

    const isCompoarePassword = await user.comparePassword(currentPassword);
    if (!isCompoarePassword) {
        return reply.send({
            success: false,
            message: request.i18n.incorrect_password,
        });
    }

    const payload = {
        password: newPassword,
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
            message: request.i18n.user_password_update_error,
        });
    }

    return reply.send({
        success: true,
        message: request.i18n.user_password_update_success,
    });
};
