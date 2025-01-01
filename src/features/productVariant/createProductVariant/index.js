const ProductVariant = require('../productVariant.model');
const ItemRelation = require('../../itemRelation/itemRelation.model');
const { ITEM_KINDS } = require('../../item/item.constant');

module.exports = async (request, reply) => {
    const tenantId = request.tenant._id;
    const {
        translations,
        prices,
        product,
    } = request.body;

    const productVariant = await ProductVariant.create({
        tenant: tenantId,
        translations,
        prices,
    });

    if (!productVariant) {
        return reply.send({
            success: false,
            message: request.i18n.product_variant_create_error,
        });
    }

    if (product) {
        await ItemRelation.create({
            source: {
                item: product,
                kind: ITEM_KINDS.PRODUCT,
            },
            target: {
                item: productVariant._id,
                kind: ITEM_KINDS.PRODUCT_VARIANT,
            },
        });
    }

    return reply.send({
        success: true,
        message: request.i18n.product_variant_create_success,
    });
};
