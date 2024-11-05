const authController = require('./auth.controller');
const { PERMISSIONS } = require('../common/user.constant');

module.exports = (fastify, opts, done) => {
    fastify.get(
        '/me',
        {
            preHandler: [
                fastify.authenticate,
                fastify.authorize(PERMISSIONS.GET_ME),
            ],
        },
        authController.me,
    );

    fastify.get(
        '/me/permissions',
        {
            preHandler: [
                fastify.authenticate,
                fastify.authorize(PERMISSIONS.GET_ME_PERMISSIONS),
            ],
        },
        authController.mePermissions,
    );

    fastify.post('/login', authController.login);

    fastify.post('/register', authController.register);

    // TODO: add reset password endpoints

    done();
};
