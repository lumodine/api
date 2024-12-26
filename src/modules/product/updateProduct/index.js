const Product = require('../product.model');
const ItemRelation = require('../../itemRelation/itemRelation.model');

module.exports = async (request, reply) => {
    const {
        tenantId,
        productId,
    } = request.params;
    const {
        translations,
        prices,
        image,
        type,
        category,
        tags,
    } = request.body;

    const product = await Product
        .findOne({
            tenant: tenantId,
            _id: productId,
        });

    if (!product) {
        return reply.send({
            success: false,
            message: request.i18n.product_not_found,
        });
    }

    const updatedProduct = await Product.findByIdAndUpdate(
        productId,
        {
            translations,
            prices,
            image,
            type,
        },
        {
            new: true,
        }
    );

    if (!updatedProduct) {
        return reply.send({
            success: false,
            message: request.i18n.product_update_error,
        });
    }

    await ItemRelation.deleteMany({
        targetItem: productId
    });

    if (category) {
        await ItemRelation.create({
            sourceItem: category,
            targetItem: productId
        });
    }

    if (tags && tags.length > 0) {
        await Promise.all(
            tags.map(tagId => 
                ItemRelation.create({
                    sourceItem: tagId,
                    targetItem: productId
                })
            )
        );
    }

    return reply.send({
        success: true,
        message: request.i18n.product_update_success,
    });
};
