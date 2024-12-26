const ProductVariant = require('../productVariant.model');
const ItemRelation = require('../../itemRelation/itemRelation.model');

module.exports = async (request, reply) => {
    const {
        tenantId,
        productVariantId,
    } = request.params;
    const {
        translations,
        prices,
        product,
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

    if (product) {
        await ItemRelation.deleteMany({
            sourceItem: product,
            targetItem: productVariantId
        });

        await ItemRelation.create({
            sourceItem: product,
            targetItem: productVariantId
        });
    }

    return reply.send({
        success: true,
        message: request.i18n.product_variant_update_success,
    });
};
