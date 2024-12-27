const Announcement = require('../announcement.model');

module.exports = async (request, reply) => {
    const {
        tenantId,
        announcementId,
    } = request.params;

    const {
        translations,
    } = request.body;

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

    //TODO: check translations.language

    const payload = {
        tenant: tenantId,
        translations,
    };

    const updatedAnnouncement = await Announcement.findByIdAndUpdate(
        announcementId,
        payload,
        {
            new: true,
        }
    );

    if (!updatedAnnouncement) {
        return reply.send({
            success: false,
            message: request.i18n.announcement_update_error,
        });
    }

    return reply.send({
        success: true,
        message: request.i18n.announcement_update_success,
    });
};
