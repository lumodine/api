const Product = require('../product.model');
const ItemRelation = require('../../itemRelation/itemRelation.model');

module.exports = async (request, reply) => {
    const tenantId = request.tenant._id;
    const {
        translations,
        prices,
        image,
        type,
        category,
        tags,
    } = request.body;

    const product = await Product.create({
        tenant: tenantId,
        translations,
        prices,
        image,
        type,
    });

    if (!product) {
        return reply.send({
            success: false,
            message: request.i18n.product_create_error,
        });
    }

    if (category) {
        await ItemRelation.create({
            sourceItem: category,
            targetItem: product._id
        });
    }

    if (tags && tags.length > 0) {
        await Promise.all(
            tags.map(tagId => 
                ItemRelation.create({
                    sourceItem: tagId,
                    targetItem: product._id
                })
            )
        );
    }

    return reply.send({
        success: true,
        message: request.i18n.product_create_success,
    });
};
