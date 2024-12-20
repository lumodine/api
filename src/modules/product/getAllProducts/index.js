const Product = require('../product.model');

module.exports = async (request, reply) => {
    const {
        tenantId,
        categoryId,
    } = request.params;
    
    const products = await Product
        .find({
            tenant: tenantId,
            'parentItems.item': {
                $in: categoryId,
            },
        }).sort({
            sort: 1
        })
        .populate('translations.language')
        .populate('prices.currency')
        .populate('parentItems.item');

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
