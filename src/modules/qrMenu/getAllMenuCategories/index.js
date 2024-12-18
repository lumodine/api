const Category = require('../../category/category.model');
const { CATEGORY_STATUS } = require('../../category/category.constant');

module.exports = async (request, reply) => {
    const tenantId = request.tenant._id;

    const categories = await Category
        .find({
            tenant: tenantId,
            status: CATEGORY_STATUS.PUBLISHED,
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
