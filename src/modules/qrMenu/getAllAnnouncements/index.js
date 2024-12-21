const { ANNOUNCEMENT_STATUS } = require('../../announcement/announcement.constant');
const Announcement = require('../../announcement/announcement.model');

module.exports = async (request, reply) => {
    const tenantId = request.tenant._id;

    const announcements = await Announcement
        .find({
            tenant: tenantId,
            status: {
                $ne: ANNOUNCEMENT_STATUS.HIDDEN,
            },
        })
        .sort({
            sort: 1,
        })
        .populate('translations.language');

    if (announcements.length === 0) {
        return reply.send({
            success: false,
            message: request.i18n.announcement_not_found,
        });
    }

    return reply.send({
        success: true,
        data: announcements,
    });
};
