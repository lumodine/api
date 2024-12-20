const { ITEM_KINDS } = require('../../item/item.constant');
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
        tags,
    } = request.body;

    const product = await Product
        .findOne({
            tenant: tenantId,
            'parentItems.item': {
                $in: categoryId,
            },
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

    const parentItems = [
        {
            item: category,
            kind: ITEM_KINDS.CATEGORY,
        },
    ];

    if (tags) {
        tags.forEach((tag) => {
            parentItems.push({
                item: tag,
                kind: ITEM_KINDS.TAG,
            });
        });
    }

    const payload = {
        tenant: tenantId,
        translations,
        image,
        parentItems,
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
