const Tag = require('../tag.model');

module.exports = async (request, reply) => {
    const {
        tenantId,
        tagId,
    } = request.params;

    const {
        translations,
        color,
    } = request.body;

    const tag = await Tag
        .findOne({
            tenant: tenantId,
            _id: tagId,
        });

    if (!tag) {
        return reply.send({
            success: false,
            message: request.i18n.tag_not_found,
        });
    }

    //TODO: check translations.language

    const payload = {
        tenant: tenantId,
        translations,
        theme: {
            color,
        },
    };

    const updatedTag = await Tag.findByIdAndUpdate(
        tagId,
        payload,
        {
            new: true,
        }
    );

    if (!updatedTag) {
        return reply.send({
            success: false,
            message: request.i18n.tag_update_error,
        });
    }

    return reply.send({
        success: true,
        message: request.i18n.tag_update_success,
    });
};
