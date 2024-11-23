const authController = require('./auth.controller');
const { PERMISSIONS } = require('../user/user.constant');

module.exports = (fastify, opts, done) => {
    fastify.post(
        '/login',
        authController.login
    );

    fastify.post(
        '/register',
        authController.register
    );

    fastify.post(
        '/forgot-password',
        authController.forgotPassword
    );

    fastify.post(
        '/reset-password',
        authController.resetPassword
    );

    fastify.get(
        '/me',
        {
            preHandler: [
                fastify.authenticate,
                fastify.authorize(PERMISSIONS.GET_ME),
            ],
        },
        authController.getMe,
    );

    done();
};
