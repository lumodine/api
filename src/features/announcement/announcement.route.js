const { PERMISSIONS } = require('../user/user.constant');
const createAnnouncement = require('./createAnnouncement');
const updateAnnouncement = require('./updateAnnouncement');
const removeAnnouncement = require('./removeAnnouncement');
const getAnnouncementById = require('./getAnnouncementById');
const getAllAnnouncements = require('./getAllAnnouncements');
const updateAnnouncementSort = require('./updateAnnouncementSort');
const updateAnnouncementStatus = require('./updateAnnouncementStatus');

module.exports = (fastify, opts, done) => {
    fastify.post(
        '/',
        {
            preHandler: [
                fastify.authenticate,
                fastify.authorize(PERMISSIONS.ANNOUNCEMENT_CREATE),
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
                fastify.authorize(PERMISSIONS.ANNOUNCEMENT_GET_ALL),
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
                fastify.authorize(PERMISSIONS.ANNOUNCEMENT_UPDATE),
                fastify.checkTenantByParams,
            ],
        },
        updateAnnouncement
    );

    fastify.put(
        '/sort',
        {
            preHandler: [
                fastify.authenticate,
                fastify.authorize(PERMISSIONS.ANNOUNCEMENT_UPDATE_SORT),
                fastify.checkTenantByParams,
            ],
        },
        updateAnnouncementSort,
    );

    fastify.put(
        '/:announcementId/status',
        {
            preHandler: [
                fastify.authenticate,
                fastify.authorize(PERMISSIONS.ANNOUNCEMENT_UPDATE_STATUS),
                fastify.checkTenantByParams,
            ],
        },
        updateAnnouncementStatus,
    );

    fastify.delete(
        '/:announcementId',
        {
            preHandler: [
                fastify.authenticate,
                fastify.authorize(PERMISSIONS.ANNOUNCEMENT_REMOVE),
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
                fastify.authorize(PERMISSIONS.ANNOUNCEMENT_GET_BY_ID),
                fastify.checkTenantByParams,
            ],
        },
        getAnnouncementById
    );

    done();
};
