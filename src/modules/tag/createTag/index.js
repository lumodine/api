const Tag = require('../tag.model');

module.exports = async (request, reply) => {
    const { tenantId } = request.params;

    const {
        translations,
        isShowInMenu,
        color,
    } = request.body;

    //TODO: check translations.language

    const payload = {
        tenant: tenantId,
        translations,
        isShowInMenu,
        theme: {
            color,
        },
    };

    const createdTag = await (new Tag(payload)).save();

    if (!createdTag) {
        return reply.send({
            success: false,
            message: 'tag_create_error',
        });
    }

    return reply.send({
        success: true,
        message: 'tag_create_success',
    });
};
