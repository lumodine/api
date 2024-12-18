const Category = require('../category.model');

module.exports = async (request, reply) => {
    const { tenantId } = request.params;
    const categories = await Category
        .find({
            tenant: tenantId,
        })
        .sort({
            sort: 1,
        })
        .populate('translations.language');

    if (categories.length === 0) {
        return reply.send({
            success: false,
            message: 'categories_not_found',
        });
    }

    return reply.send({
        success: true,
        data: categories,
    });
};
