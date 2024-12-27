const ProductVariant = require('../productVariant.model');

module.exports = async (request, reply) => {
    const {
        tenantId,
        productVariantId,
    } = request.params;

    const product = await ProductVariant
        .findOne({
            tenant: tenantId,
            _id: productVariantId,
        });

    if (!product) {
        return reply.send({
            success: false,
            message: request.i18n.product_variant_not_found,
        });
    }

    const isRemoved = await Product.findByIdAndDelete(product._id);
    if (!isRemoved) {
        return reply.send({
            success: false,
            message: request.i18n.product_variant_remove_error,
        });
    }

    return reply.send({
        success: true,
        message: request.i18n.product_variant_remove_success,
    });
};
