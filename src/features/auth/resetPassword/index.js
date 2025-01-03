const User = require('../../user/user.model');
const Token = require('../../token/token.model');
const { TOKEN_TYPES } = require('../../token/token.constant');
const emailService = require('@lumodine/email');

module.exports = async (request, reply) => {
    const { t } = request.query;
    const {
        password,
        confirmPassword
    } = request.body;

    const token = await Token.findOne({
        data: t,
        type: TOKEN_TYPES.FORGOT_PASSWORD,
    });

    if (!token) {
        return reply.send({
            success: false,
            message: request.i18n.token_not_found_or_expire,
        });
    }

    if (password != confirmPassword) {
        return reply.send({
            success: false,
            message: request.i18n.passwords_does_not_match,
        });
    }

    const updatedUser = await User.findByIdAndUpdate(token.user, {
        password,
    }, {
        new: true,
    });

    if (!updatedUser) {
        return reply.send({
            success: false,
            message: request.i18n.user_password_update_error,
        });
    }

    await Token.findByIdAndDelete(token._id);

    //TODO: 
    const emailHtml = `<p>Your password has been reset successfully</p>`;
    emailService.send({
        from: {
            name: process.env.EMAIL_USER_NAME,
            address: process.env.EMAIL_USER_EMAIL,
        },
        to: updatedUser.email,
        subject: 'Reset Password',
        html: emailHtml,
    });

    return reply.send({
        success: true,
        message: request.i18n.user_password_update_success,
    });
};
