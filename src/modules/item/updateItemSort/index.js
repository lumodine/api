const Item = require('../item.model');

module.exports = async (request, reply) => {
    const { items } = request.body;

    const bulkOperations = items.map(item => ({
        updateOne: {
            filter: {
                _id: item.itemId,
            },
            update: {
                $set: {
                    sort: item.sort,
                },
            },
        },
    }));

    const result = await Item.bulkWrite(bulkOperations);

    if (!result) {
        return reply.send({
            success: false,
            message: 'item_sort_error',
        });
    }

    return reply.send({
        success: true,
        message: 'item_sort_success',
    });
};
