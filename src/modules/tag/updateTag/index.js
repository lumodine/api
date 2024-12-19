const Tag = require('../tag.model');

module.exports = async (request, reply) => {
    const {
        tenantId,
        tagId,
    } = request.params;

    const {
        translations,
        isShowInMenu,
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
            message: 'tag_not_found',
        });
    }

    //TODO: check translations.language

    const payload = {
        tenant: tenantId,
        translations,
        isShowInMenu,
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
            message: 'tag_update_error',
        });
    }

    return reply.send({
        success: true,
        data: updatedTag,
        message: 'tag_update_success',
    });
};
