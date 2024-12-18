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
            message: 'product_update_error',
        });
    }

    return reply.send({
        success: true,
        message: 'product_update_success',
    });
};
