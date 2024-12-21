const Announcement = require('../announcement.model');

module.exports = async (request, reply) => {
    const {
        tenantId,
        announcementId,
    } = request.params;

    const announcement = await Announcement
        .findOne({
            tenant: tenantId,
            _id: announcementId,
        });

    if (!announcement) {
        return reply.send({
            success: false,
            message: request.i18n.announcement_not_found,
        });
    }

    const isRemovedAnnouncement = await Announcement.findByIdAndDelete(announcementId);

    if (!isRemovedAnnouncement) {
        return reply.send({
            success: false,
            message: request.i18n.announcement_remove_error,
        });
    }

    return reply.send({
        success: true,
        message: request.i18n.announcement_remove_success,
    });
};
