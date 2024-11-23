const languageController = require('./language.controller');
const { PERMISSIONS } = require('../user/user.constant');

module.exports = (fastify, opts, done) => {
    fastify.post(
        '/',
        {
            preHandler: [
                fastify.authenticate,
                fastify.authorize(PERMISSIONS.CREATE_LANGUAGE),
            ],
        },
        languageController.create
    );

    fastify.get(
        '/',
        languageController.getAll
    );

    fastify.put(
        '/:languageId',
        {
            preHandler: [
                fastify.authenticate,
                fastify.authorize(PERMISSIONS.UPDATE_LANGUAGE),
            ],
        },
        languageController.update
    );

    fastify.delete(
        '/:languageId',
        {
            preHandler: [
                fastify.authenticate,
                fastify.authorize(PERMISSIONS.DELETE_LANGUAGE),
            ],
        },
        languageController.remove
    );

    fastify.get(
        '/:languageId',
        languageController.getById
    );

    done();
};
