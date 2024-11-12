const authController = require('./auth.controller');
const { PERMISSIONS } = require('../user/user.constant');
const {
    getMeSchema,
    getMePermissionsSchema,
    loginSchema,
    registerSchema,
    forgotPasswordSchema,
    resetPasswordSchema,
} = require('./auth.schema');

module.exports = (fastify, opts, done) => {
    fastify.post(
        '/login',
        loginSchema,
        authController.login
    );

    fastify.post(
        '/register',
        registerSchema,
        authController.register
    );

    fastify.post(
        '/forgot-password',
        forgotPasswordSchema,
        authController.forgotPassword
    );

    fastify.post(
        '/reset-password',
        resetPasswordSchema,
        authController.resetPassword
    );

    fastify.get(
        '/me',
        {
            ...getMeSchema,
            preHandler: [
                fastify.authenticate,
                fastify.authorize(PERMISSIONS.GET_ME),
            ],
        },
        authController.getMe,
    );

    fastify.get(
        '/me/permissions',
        {
            ...getMePermissionsSchema,
            preHandler: [
                fastify.authenticate,
                fastify.authorize(PERMISSIONS.GET_ME_PERMISSIONS),
            ],
        },
        authController.getMePermissions,
    );

    done();
};
