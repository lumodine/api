const Product = require('../../product/product.model');
const { PRODUCT_STATUS } = require('../../product/product.constant');

module.exports = async (request, reply) => {
    const tenantId = request.tenant._id;
    const { categoryId } = request.params;

    const products = await Product
        .find({
            tenant: tenantId,
            parentItem: categoryId,
            status: {
                $ne: PRODUCT_STATUS.HIDDEN,
            },
        })
        .sort({
            sort: 1,
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
