const ProductVariant = require('../productVariant.model');
const ItemRelation = require('../../itemRelation/itemRelation.model');
const { ITEM_KINDS } = require('../../item/item.constant');

module.exports = async (request, reply) => {
    const {
        tenantId,
        productVariantId,
    } = request.params;
    const {
        translations,
        prices,
        productId,
    } = request.body;

    const productVariant = await ProductVariant
        .findOne({
            tenant: tenantId,
            _id: productVariantId,
        });

    if (!productVariant) {
        return reply.send({
            success: false,
            message: request.i18n.product_variant_not_found,
        });
    }

    const updatedProductVariant = await ProductVariant.findByIdAndUpdate(
        productVariantId,
        {
            translations,
            prices,
        },
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

    if (productId) {
        await ItemRelation.deleteMany({
            'source.item': productId,
            'target.item': productVariantId
        });

        await ItemRelation.create({
            source: {
                item: productId,
                kind: ITEM_KINDS.PRODUCT,
            },
            target: {
                item: productVariantId,
                kind: ITEM_KINDS.PRODUCT_VARIANT,
            }
        });
    }

    return reply.send({
        success: true,
        message: request.i18n.product_variant_update_success,
    });
};
