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
        password,
        confirmPassword
    } = request.body;

    if (password != confirmPassword) {
        return reply.send({
            success: false,
            message: 'passwords_does_not_match',
        });
    }

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
        message: 'reset_email_successfully_send',
    });
};

const resetPassword = async (request, reply) => {
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
            message: 'token_not_found_or_expire',
        });
    }

    if (password != confirmPassword) {
        return reply.send({
            success: false,
            message: 'passwords_does_not_match',
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

    return reply.send({
        success: true,
        message: 'password_update_success',
    });
};

const getMe = async (request, reply) => {
    const { sub } = request.user;

    const user = await User.findById(sub);

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

const updateMeInfo = async (request, reply) => {
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

const updateMeEmail = async (request, reply) => {
    const { sub } = request.user;

    const {
        email,
    } = request.body;

    const user = await User.findById(sub);

    if (!user) {
        return reply.send({
            success: false,
            message: 'user_not_found',
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
            message: 'user_already_exists',
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
            message: 'user_update_error',
        });
    }

    return reply.send({
        success: true,
        message: 'user_update_success',
    });
};

const updateMePassword = async (request, reply) => {
    const { sub } = request.user;

    const {
        currentPassword,
        newPassword,
        confirmNewPassword,
    } = request.body;

    if (newPassword != confirmNewPassword) {
        return reply.send({
            success: false,
            message: 'passwords_does_not_match',
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
            message: 'user_not_found',
        });
    }

    const isCompoarePassword = await user.comparePassword(currentPassword);
    if (!isCompoarePassword) {
        return reply.send({
            success: false,
            message: 'incorrect_password',
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
            message: 'password_update_error',
        });
    }

    return reply.send({
        success: true,
        message: 'password_update_success',
    });
};

module.exports = {
    login,
    register,
    forgotPassword,
    resetPassword,
    getMe,
    updateMeInfo,
    updateMeEmail,
    updateMePassword,
};
