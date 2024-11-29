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
            ],
        },
        authController.getMe,
    );

    fastify.put(
        '/me/info',
        {
            preHandler: [
                fastify.authenticate,
            ],
        },
        authController.updateMeInfo,
    );

    fastify.put(
        '/me/email',
        {
            preHandler: [
                fastify.authenticate,
            ],
        },
        authController.updateMeEmail,
    );

    fastify.put(
        '/me/password',
        {
            preHandler: [
                fastify.authenticate,
            ],
        },
        authController.updateMePassword,
    );

    done();
};
