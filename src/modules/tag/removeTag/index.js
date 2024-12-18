const Tag = require('../tag.model');

module.exports = async (request, reply) => {
    const {
        tenantId,
        tagId,
    } = request.params;

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

    const isRemovedTag = await Tag.findByIdAndDelete(tagId);

    if (!isRemovedTag) {
        return reply.send({
            success: false,
            message: 'tag_remove_error',
        });
    }

    return reply.send({
        success: true,
        message: 'tag_remove_success',
    });
};
