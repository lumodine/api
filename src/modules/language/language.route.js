const languageController = require('./language.controller');
const { PERMISSIONS } = require('../common/user.constant');
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
        {
            ...getAllLanguagesSchema,
            preHandler: [
                fastify.authenticate,
                fastify.authorize(PERMISSIONS.GET_ALL_LANGUAGES),
            ],
        },
        languageController.getAll
    );

    fastify.put(
        '/:id',
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
        '/:id',
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
        '/:id',
        {
            ...getByIdLanguageSchema,
            preHandler: [
                fastify.authenticate,
                fastify.authorize(PERMISSIONS.GET_LANGUAGE),
            ],
        },
        languageController.getById
    );

    done();
};
