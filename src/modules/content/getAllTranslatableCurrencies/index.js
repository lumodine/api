const Product = require('../../product/product.model');

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
        query['parentItems.item'] = {
            $in: item,
        };
    }

    const [products] = await Promise.all([
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
    ]);

    return reply.send({
        success: true,
        data: {
            products,
        },
    });
};
