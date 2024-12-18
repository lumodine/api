const Product = require('../product.model');

module.exports = async (request, reply) => {
    const {
        tenantId,
        categoryId,
    } = request.params;
    const products = await Product
        .find({
            tenant: tenantId,
            category: categoryId,
        }).sort({
            sort: 1
        })
        .populate('translations.language')
        .populate('prices.currency');

    if (products.length === 0) {
        return reply.send({
            success: false,
            message: 'products_not_found',
        });
    }

    return reply.send({
        success: true,
        data: products,
    });
};
