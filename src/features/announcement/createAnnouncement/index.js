const Announcement = require('../announcement.model');

module.exports = async (request, reply) => {
    const { tenantId } = request.params;

    const {
        translations,
    } = request.body;

    //TODO: check translations.language

    const payload = {
        tenant: tenantId,
        translations,
    };

    const createdAnnouncement = await (new Announcement(payload)).save();

    if (!createdAnnouncement) {
        return reply.send({
            success: false,
            message: request.i18n.announcement_create_error,
        });
    }

    return reply.send({
        success: true,
        message: request.i18n.announcement_create_success,
    });
};
