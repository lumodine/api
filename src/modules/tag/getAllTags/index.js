const Tag = require('../tag.model');

module.exports = async (request, reply) => {
    const { tenantId } = request.params;
    const tags = await Tag
        .find({
            tenant: tenantId,
        })
        .sort({
            sort: 1,
        })
        .populate('translations.language');

    if (tags.length === 0) {
        return reply.send({
            success: false,
            message: request.i18n.tags_not_found,
        });
    }

    return reply.send({
        success: true,
        data: tags,
    });
};
