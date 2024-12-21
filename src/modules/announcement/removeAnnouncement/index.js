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
            message: 'announcement_not_found',
        });
    }

    const isRemovedAnnouncement = await Announcement.findByIdAndDelete(announcementId);

    if (!isRemovedAnnouncement) {
        return reply.send({
            success: false,
            message: 'announcement_remove_error',
        });
    }

    return reply.send({
        success: true,
        message: 'announcement_remove_success',
    });
};
