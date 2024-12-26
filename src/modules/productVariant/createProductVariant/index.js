const ProductVariant = require('../productVariant.model');
const ItemRelation = require('../../itemRelation/itemRelation.model');

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
            sourceItem: product,
            targetItem: productVariant._id
        });
    }

    return reply.send({
        success: true,
        message: request.i18n.product_variant_create_success,
    });
};
