const User = require('../../user/user.model');
const Token = require('../../token/token.model');
const { TOKEN_TYPES } = require('../../token/token.constant');
const emailService = require('@lumodine/email');

module.exports = async (request, reply) => {
    const { email } = request.body;

    const user = await User.findOne({
        email,
    });

    if (user) {
        let token = await Token.findOne({
            user: user._id,
            type: TOKEN_TYPES.FORGOT_PASSWORD,
        });

        if (!token) {
            token = await (new Token({
                user: user._id,
                type: TOKEN_TYPES.FORGOT_PASSWORD,
            })).save();
        }

        //TODO: 
        const emailHtml = `<p>Reset your password via ${process.env.DASHBOARD_URL}/reset-password?t=${token.data}</p>`;
        emailService.send({
            from: 'noreply@lumodine.com',
            to: user.email,
            subject: 'forgot_password',
            html: emailHtml,
        });
    }

    return reply.send({
        success: true,
        message: request.i18n.reset_email_successfully_send,
    });
};
