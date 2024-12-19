const Product = require('../product.model');

module.exports = async (request, reply) => {
    const {
        tenantId,
        categoryId,
        productId,
    } = request.params;

    const {
        translations,
        image,
        category,
        prices,
    } = request.body;

    const product = await Product
        .findOne({
            tenant: tenantId,
            parentItem: categoryId,
            _id: productId,
        });

    if (!product) {
        return reply.send({
            success: false,
            message: 'product_not_found',
        });
    }

    //TODO: check translations.language
    //TODO: check category
    //TODO: check prices.currency

    const payload = {
        tenant: tenantId,
        translations,
        image,
        parentItem: category,
        prices,
    };

    const updatedProduct = await Product.findByIdAndUpdate(
        productId,
        payload,
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
        data: updatedProduct,
    });
};
