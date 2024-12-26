const { ITEM_KINDS } = require('../../item/item.constant');
const ProductVariant = require('../productVariant.model');

module.exports = async (request, reply) => {
    const {
        tenantId,
        productVariantId,
    } = request.params;

    const {
        productId,
        translations,
        prices,
    } = request.body;

    const product = await ProductVariant
        .findOne({
            tenant: tenantId,
            _id: productVariantId,
        });

    if (!product) {
        return reply.send({
            success: false,
            message: request.i18n.product_variant_not_found,
        });
    }

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

    const updatedProductVariant = await ProductVariant.findByIdAndUpdate(
        productVariantId,
        payload,
        {
            new: true,
        }
    );

    if (!updatedProductVariant) {
        return reply.send({
            success: false,
            message: request.i18n.product_variant_update_error,
        });
    }

    return reply.send({
        success: true,
        message: request.i18n.product_variant_update_success,
    });
};
