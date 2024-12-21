const Tag = require('../tag.model');

module.exports = async (request, reply) => {
    const {
        tenantId,
        tagId
    } = request.params;

    const tag = await Tag
        .findOne({
            tenant: tenantId,
            _id: tagId,
        })
        .populate('translations.language');

    if (!tag) {
        return reply.send({
            success: false,
            message: request.i18n.tag_not_found,
        });
    }

    return reply.send({
        success: true,
        data: tag,
    });
};
