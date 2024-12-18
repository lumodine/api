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
                fastify.authorize(PERMISSIONS.CREATE_LANGUAGE),
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
                fastify.authorize(PERMISSIONS.UPDATE_LANGUAGE),
            ],
        },
        updateLanguage
    );

    fastify.delete(
        '/:languageId',
        {
            preHandler: [
                fastify.authenticate,
                fastify.authorize(PERMISSIONS.DELETE_LANGUAGE),
            ],
        },
        removeLanguage
    );

    fastify.get(
        '/:languageId',
        getLanguageById
    );

    done();
};
