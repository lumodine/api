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
            message: 'user_not_found',
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
            message: 'user_update_error',
        });
    }

    return reply.send({
        success: true,
        message: 'user_update_success',
    });
};
