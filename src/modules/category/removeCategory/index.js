const Category = require('../category.model');
const Product = require('../../product/product.model');

module.exports = async (request, reply) => {
    const {
        tenantId,
        categoryId,
    } = request.params;

    const category = await Category
        .findOne({
            tenant: tenantId,
            _id: categoryId,
        });

    if (!category) {
        return reply.send({
            success: false,
            message: 'category_not_found',
        });
    }

    const [
        isRemovedCategory,
        isRemovedProduct,
    ] = await Promise.all([
        Category.findByIdAndDelete(categoryId),
        Product.deleteMany({
            category: categoryId,
        }),
    ]);

    if (!isRemovedCategory) {
        return reply.send({
            success: false,
            message: 'category_remove_error',
        });
    }

    return reply.send({
        success: true,
        message: 'category_remove_success',
    });
};
