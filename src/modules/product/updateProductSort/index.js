const Product = require('../product.model');

module.exports = async (request, reply) => {
    const { items } = request.body;

    //TODO: check items.productId

    const bulkOperations = items.map(item => ({
        updateOne: {
            filter: {
                _id: item.productId,
            },
            update: {
                $set: {
                    sort: item.sort,
                },
            },
        },
    }));

    const result = await Product.bulkWrite(bulkOperations);

    if (!result) {
        return reply.send({
            success: false,
            message: 'product_sort_error',
        });
    }

    return reply.send({
        success: true,
        message: 'product_sort_success',
    });
};
