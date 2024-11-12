const languageController = require('./language.controller');
const { PERMISSIONS } = require('../user/user.constant');
const {
    createLanguageSchema,
    updateLanguageSchema,
    deleteLanguageSchema,
    getByIdLanguageSchema,
    getAllLanguagesSchema,
} = require('./language.schema');

module.exports = (fastify, opts, done) => {
    fastify.post(
        '/',
        {
            ...createLanguageSchema,
            preHandler: [
                fastify.authenticate,
                fastify.authorize(PERMISSIONS.CREATE_LANGUAGE),
            ],
        },
        languageController.create
    );

    fastify.get(
        '/',
        getAllLanguagesSchema,
        languageController.getAll
    );

    fastify.put(
        '/:languageId',
        {
            ...updateLanguageSchema,
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
            ...deleteLanguageSchema,
            preHandler: [
                fastify.authenticate,
                fastify.authorize(PERMISSIONS.DELETE_LANGUAGE),
            ],
        },
        languageController.remove
    );

    fastify.get(
        '/:languageId',
        getByIdLanguageSchema,
        languageController.getById
    );

    done();
};
