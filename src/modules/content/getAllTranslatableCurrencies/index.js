const Product = require('../../product/product.model');

module.exports = async (request, reply) => {
    const { tenantId } = request.params;

    const [products] = await Promise.all([
        Product.find({
            tenant: tenantId
        }).populate([
            'translations.language',
            'prices.currency',
        ]),
    ]);

    return reply.send({
        success: true,
        data: {
            products,
        },
    });
};
