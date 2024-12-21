const { PERMISSIONS } = require('../user/user.constant');
const createAnnouncement = require('./createAnnouncement');
const updateAnnouncement = require('./updateAnnouncement');
const removeAnnouncement = require('./removeAnnouncement');
const getAnnouncementById = require('./getAnnouncementById');
const getAllAnnouncements = require('./getAllAnnouncements');

module.exports = (fastify, opts, done) => {
    fastify.post(
        '/',
        {
            preHandler: [
                fastify.authenticate,
                fastify.authorize(PERMISSIONS.CREATE_ANNOUNCEMENT),
                fastify.checkTenantByParams,
            ],
        },
        createAnnouncement
    );

    fastify.get(
        '/',
        {
            preHandler: [
                fastify.authenticate,
                fastify.authorize(PERMISSIONS.GET_ALL_ANNOUNCEMENTS),
                fastify.checkTenantByParams,
            ],
        },
        getAllAnnouncements
    );

    fastify.put(
        '/:announcementId',
        {
            preHandler: [
                fastify.authenticate,
                fastify.authorize(PERMISSIONS.UPDATE_ANNOUNCEMENT),
                fastify.checkTenantByParams,
            ],
        },
        updateAnnouncement
    );

    fastify.delete(
        '/:announcementId',
        {
            preHandler: [
                fastify.authenticate,
                fastify.authorize(PERMISSIONS.DELETE_ANNOUNCEMENT),
                fastify.checkTenantByParams,
            ],
        },
        removeAnnouncement
    );

    fastify.get(
        '/:announcementId',
        {
            preHandler: [
                fastify.authenticate,
                fastify.authorize(PERMISSIONS.GET_ANNOUNCEMENT),
                fastify.checkTenantByParams,
            ],
        },
        getAnnouncementById
    );

    done();
};
