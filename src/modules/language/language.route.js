const { PERMISSIONS } = require('../user/user.constant');
const createLanguage = require('./createLanguage');
const updateLanguage = require('./updateLanguage');
const removeLanguage = require('./removeLanguage');
const getLanguageById = require('./getLanguageById');
const getAllLanguages = require('./getAllLanguages');

module.exports = (fastify, opts, done) => {
    fastify.post(
        '/',
        {
            preHandler: [
                fastify.authenticate,
                fastify.authorize(PERMISSIONS.LANGUAGE_CREATE),
            ],
        },
        createLanguage
    );

    fastify.get(
        '/',
        getAllLanguages
    );

    fastify.put(
        '/:languageId',
        {
            preHandler: [
                fastify.authenticate,
                fastify.authorize(PERMISSIONS.LANGUAGE_UPDATE),
            ],
        },
        updateLanguage
    );

    fastify.delete(
        '/:languageId',
        {
            preHandler: [
                fastify.authenticate,
                fastify.authorize(PERMISSIONS.LANGUAGE_REMOVE),
            ],
        },
        removeLanguage
    );

    fastify.get(
        '/:languageId',
        {
            preHandler: [
                fastify.authenticate,
                fastify.authorize(PERMISSIONS.LANGUAGE_GET_BY_ID),
            ],
        },
        getLanguageById
    );

    done();
};
