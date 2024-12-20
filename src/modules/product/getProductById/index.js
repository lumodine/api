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
        })
        .populate('translations.language')
        .populate('prices.currency')
        .populate({
            path: 'parentItems.item',
            populate: {
                path: 'translations.language',
            },
        });

    if (!product) {
        return reply.send({
            success: false,
            message: 'product_not_found',
        });
    }

    return reply.send({
        success: true,
        data: product,
    });
};
