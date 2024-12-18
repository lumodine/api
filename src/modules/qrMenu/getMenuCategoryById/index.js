const Category = require('../../category/category.model');
const { CATEGORY_STATUS } = require('../../category/category.constant');

module.exports = async (request, reply) => {
    const tenantId = request.tenant._id;
    const { categoryId } = request.params;

    const category = await Category
        .findOne({
            _id: categoryId,
            tenant: tenantId,
            status: CATEGORY_STATUS.PUBLISHED,
        })
        .populate('translations.language');

    if (!category) {
        return reply.send({
            success: false,
            message: 'category_not_found',
        });
    }

    return reply.send({
        success: true,
        data: category,
    });
};
