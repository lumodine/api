const Product = require('../../product/product.model');
const ProductVariant = require('../../productVariant/productVariant.model');
const ItemRelation = require('../../itemRelation/itemRelation.model');

module.exports = async (request, reply) => {
    const { tenantId } = request.params;
    const { item } = request.query;

    const baseQuery = {
        tenant: tenantId,
    };

    const query = {
        ...baseQuery,
    };

    if (item) {
        const relations = await ItemRelation.find({ 
            sourceItem: { 
                $in: item 
            } 
        });
        const relatedItemIds = relations.map(relation => relation.targetItem);
        
        query._id = {
            $in: relatedItemIds
        };
    }

    

    const [
        products,
        productVariants,
    ] = await Promise.all([
        Product
            .find(query)
            .populate([
                {
                    path: 'translations.language',
                },
                {
                    path: 'prices.currency',
                },
            ]),
        ProductVariant
            .find(query)
            .populate([
                {
                    path: 'translations.language',
                },
                {
                    path: 'prices.currency',
                },
            ]),
    ]);

    return reply.send({
        success: true,
        data: {
            products,
            productVariants,
        },
    });
};
