const Product = require('../product.model');

module.exports = async (request, reply) => {
    const {
        tenantId,
        categoryId,
        productId,
    } = request.params;

    const product = await Product
        .findOne({
            tenant: tenantId,
            'parentItems.item': {
                $in: categoryId,
            },
            _id: productId,
        });

    if (!product) {
        return reply.send({
            success: false,
            message: request.i18n.product_not_found,
        });
    }

    const isRemoved = await Product.findByIdAndDelete(product._id);
    if (!isRemoved) {
        return reply.send({
            success: false,
            message: request.i18n.product_remove_error,
        });
    }

    return reply.send({
        success: true,
        message: request.i18n.product_remove_success,
    });
};
