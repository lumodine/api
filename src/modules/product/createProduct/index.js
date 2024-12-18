const Product = require('../product.model');

module.exports = async (request, reply) => {
    const {
        tenantId,
        categoryId,
    } = request.params;

    const {
        translations,
        image,
        prices,
    } = request.body;

    //TODO: check translations.language
    //TODO: check category
    //TODO: check prices.currency

    const payload = {
        tenant: tenantId,
        translations,
        image,
        parentItem: categoryId,
        prices,
    };

    const createdProduct = await (new Product(payload)).save();

    if (!createdProduct) {
        return reply.send({
            success: false,
            message: 'product_create_error',
        });
    }

    return reply.send({
        success: true,
        message: 'product_create_success',
    });
};
