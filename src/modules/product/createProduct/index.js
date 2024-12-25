const { ITEM_KINDS } = require('../../item/item.constant');
const Product = require('../product.model');

module.exports = async (request, reply) => {
    const {
        tenantId,
    } = request.params;

    const {
        translations,
        image,
        prices,
        tags,
        category,
    } = request.body;

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

    const createdProduct = await (new Product(payload)).save();

    if (!createdProduct) {
        return reply.send({
            success: false,
            message: request.i18n.product_create_error,
        });
    }

    return reply.send({
        success: true,
        message: request.i18n.product_create_success,
    });
};
