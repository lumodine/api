const Product = require('../product.model');

module.exports = async (request, reply) => {
    const {
        tenantId,
        productId
    } = request.params;
    const { status } = request.body;

    const product = await Product
        .findOne({
            tenant: tenantId,
            _id: productId,
        });

    if (!product) {
        return reply.send({
            success: false,
            message: 'product_not_found',
        });
    }

    const updatedProduct = await Product.findByIdAndUpdate(
        productId,
        {
            status,
        },
        {
            new: true,
        }
    );

    if (!updatedProduct) {
        return reply.send({
            success: false,
            message: 'product_status_error',
        });
    }

    return reply.send({
        success: true,
        message: 'product_status_success',
    });
};
