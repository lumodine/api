const Announcement = require('../announcement.model');

module.exports = async (request, reply) => {
    const { tenantId } = request.params;
    
    const announcements = await Announcement
        .find({
            tenant: tenantId,
        })
        .sort({
            sort: 1,
        })
        .populate([
            {
                path: 'translations.language',
            },
        ]);

    if (announcements.length === 0) {
        return reply.send({
            success: false,
            message: request.i18n.announcements_not_found,
        });
    }

    return reply.send({
        success: true,
        data: announcements,
    });
};
