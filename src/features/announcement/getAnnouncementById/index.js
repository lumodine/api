const Announcement = require('../announcement.model');

module.exports = async (request, reply) => {
    const {
        tenantId,
        announcementId
    } = request.params;

    const announcement = await Announcement
        .findOne({
            tenant: tenantId,
            _id: announcementId,
        })
        .populate([
            {
                path: 'translations.language',
            },
        ]);

    if (!announcement) {
        return reply.send({
            success: false,
            message: request.i18n.announcement_not_found,
        });
    }

    return reply.send({
        success: true,
        data: announcement,
    });
};
