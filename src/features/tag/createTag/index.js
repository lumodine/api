const Tag = require('../tag.model');

module.exports = async (request, reply) => {
    const { tenantId } = request.params;

    const {
        translations,
        color,
    } = request.body;

    //TODO: check translations.language

    const payload = {
        tenant: tenantId,
        translations,
        theme: {
            color,
        },
    };

    const createdTag = await (new Tag(payload)).save();

    if (!createdTag) {
        return reply.send({
            success: false,
            message: request.i18n.tag_create_error,
        });
    }

    return reply.send({
        success: true,
        message: request.i18n.tag_create_success,
    });
};
