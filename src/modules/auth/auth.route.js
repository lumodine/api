const authController = require('./auth.controller');
const { PERMISSIONS } = require('../common/user.constant');
const {
    getMeSchema,
    getMePermissionsSchema,
    loginSchema,
    registerSchema,
} = require('./auth.schema');

module.exports = (fastify, opts, done) => {
    fastify.get(
        '/me',
        {
            ...getMeSchema,
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
            ...getMePermissionsSchema,
            preHandler: [
                fastify.authenticate,
                fastify.authorize(PERMISSIONS.GET_ME_PERMISSIONS),
            ],
        },
        authController.mePermissions,
    );

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

    // TODO: add reset password endpoints

    done();
};
