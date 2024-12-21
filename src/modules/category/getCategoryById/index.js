const Category = require('../category.model');

module.exports = async (request, reply) => {
    const {
        tenantId,
        categoryId
    } = request.params;

    const category = await Category
        .findOne({
            tenant: tenantId,
            _id: categoryId,
        })
        .populate('translations.language');

    if (!category) {
        return reply.send({
            success: false,
            message: request.i18n.category_not_found,
        });
    }

    return reply.send({
        success: true,
        data: category,
    });
};
