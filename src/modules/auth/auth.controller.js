const { USER_PERMISSIONS } = require('../user/user.constant');
const User = require('../user/user.model');
const Token = require('../token/token.model');
const { TOKEN_TYPES } = require('../token/token.constant');
const emailService = require('@lumodine/email');

const login = async (request, reply) => {
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

const register = async (request, reply) => {
    const {
        email,
        name,
        surname,
        password
    } = request.body;

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

const forgotPassword = async (request, reply) => {
    const { email } = request.body;

    const user = await User.findOne({
        email,
    });

    if (user) {
        let token = await Token.findOne({
            userId: user._id,
            type: TOKEN_TYPES.FORGOT_PASSWORD,
        });

        if (!token) {
            token = await (new Token({
                userId: user._id,
                type: TOKEN_TYPES.FORGOT_PASSWORD,
            })).save();
        }

        //TODO: 
        const emailHtml = `<p>Reset your password via ${process.env.DASHBOARD_URL}/reset-password/?t=${token.data}</p>`;
        emailService.send({
            from: 'noreply@lumodine.com',
            to: user.email,
            subject: 'forgot_password',
            html: emailHtml,
        });
    }

    return reply.send({
        success: true,
        message: 'reset_email_successfully_send',
    });
};

const resetPassword = async (request, reply) => {
    const { t } = request.query;
    const { password } = request.body;

    const token = await Token.findOne({
        data: t,
        type: TOKEN_TYPES.FORGOT_PASSWORD,
    });

    if (!token) {
        return reply.send({
            success: false,
            message: 'token_not_found_or_expire',
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
            message: 'password_update_error',
        });
    }

    await Token.findByIdAndDelete(token._id);

    //TODO: 
    const emailHtml = `<p>Your password has been reset successfully</p>`;
    emailService.send({
        from: 'noreply@lumodine.com',
        to: updatedUser.email,
        subject: 'reset_password',
        html: emailHtml,
    });

    if (!updatedUser) {
        return reply.send({
            success: false,
            message: 'password_update_success',
        });
    }
};

const getMe = async (request, reply) => {
    const userId = request.user.sub;

    const user = await User.findById(userId);

    if (!user) {
        return reply.send({
            success: false,
            message: 'user_not_found',
        });
    }

    return reply.send({
        success: true,
        data: user,
    });
};

const getMePermissions = async (request, reply) => {
    const userId = request.user.sub;

    const user = await User.findById(userId);

    if (!user) {
        return reply.send({
            success: false,
            message: 'user_not_found',
        });
    }

    return reply.send({
        success: true,
        data: USER_PERMISSIONS[user.role],
    });
};

module.exports = {
    login,
    register,
    forgotPassword,
    resetPassword,
    getMe,
    getMePermissions,
};
