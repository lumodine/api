const { PERMISSIONS } = require('../user/user.constant');
const login = require('./login');
const register = require('./register');
const forgotPassword = require('./forgotPassword');
const resetPassword = require('./resetPassword');
const getProfile = require('./getProfile');
const updateInfo = require('./updateInfo');
const updateEmail = require('./updateEmail');
const updatePassword = require('./updatePassword');

module.exports = (fastify, opts, done) => {
    fastify.post(
        '/login',
        login,
    );

    fastify.post(
        '/register',
        register,
    );

    fastify.post(
        '/forgot-password',
        forgotPassword,
    );

    fastify.post(
        '/reset-password',
        resetPassword,
    );

    fastify.get(
        '/me',
        {
            preHandler: [
                fastify.authenticate,
                fastify.authorize(PERMISSIONS.AUTH_GET_PROFILE),
            ],
        },
        getProfile,
    );

    fastify.put(
        '/me/info',
        {
            preHandler: [
                fastify.authenticate,
                fastify.authorize(PERMISSIONS.AUTH_UPDATE_INFO),
            ],
        },
        updateInfo,
    );

    fastify.put(
        '/me/email',
        {
            preHandler: [
                fastify.authenticate,
                fastify.authorize(PERMISSIONS.AUTH_UPDATE_EMAIL),
            ],
        },
        updateEmail,
    );

    fastify.put(
        '/me/password',
        {
            preHandler: [
                fastify.authenticate,
                fastify.authorize(PERMISSIONS.AUTH_UPDATE_PASSWORD),
            ],
        },
        updatePassword,
    );

    done();
};
