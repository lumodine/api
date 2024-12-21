const Announcement = require('../announcement.model');

module.exports = async (request, reply) => {
    const {
        tenantId,
        announcementId
    } = request.params;

    const { status } = request.body;

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

    const updatedAnnouncement = await Announcement.findByIdAndUpdate(
        announcementId,
        {
            status,
        },
        {
            new: true,
        }
    );

    if (!updatedAnnouncement) {
        return reply.send({
            success: false,
            message: 'announcement_status_error',
        });
    }

    return reply.send({
        success: true,
        message: 'announcement_status_success',
    });
};
