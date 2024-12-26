const { ITEM_KINDS } = require('../../item/item.constant');
const ProductVariant = require('../productVariant.model');

module.exports = async (request, reply) => {
    const {
        tenantId,
    } = request.params;

    const {
        productId,
        translations,
        prices,
    } = request.body;

    //TODO: check productId
    //TODO: check translations.language
    //TODO: check prices.currency

    const parentItems = [
        {
            item: productId,
            kind: ITEM_KINDS.PRODUCT,
        },
    ];

    const payload = {
        tenant: tenantId,
        translations,
        parentItems,
        prices,
    };

    const createdProductVariant = await (new ProductVariant(payload)).save();

    if (!createdProductVariant) {
        return reply.send({
            success: false,
            message: request.i18n.product_variant_create_error,
        });
    }

    return reply.send({
        success: true,
        message: request.i18n.product_variant_create_success,
    });
};
