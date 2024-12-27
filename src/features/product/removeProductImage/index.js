const Product = require('../product.model');

module.exports = async (request, reply) => {
    const {
        productId
    } = request.params;

    const updatedProduct = await Product.findByIdAndUpdate(
        productId,
        {
            image: null,
        },
        {
            new: true,
        }
    );

    if (!updatedProduct) {
        return reply.send({
            success: false,
            message: request.i18n.product_remove_image_error,
        });
    }

    return reply.send({
        success: true,
        message: request.i18n.product_remove_image_success,
    });
};
