const Category = require('../category.model');

module.exports = async (request, reply) => {
    const { items } = request.body;

    //TODO: check items.categoryId

    const bulkOperations = items.map(item => ({
        updateOne: {
            filter: {
                _id: item.categoryId,
            },
            update: {
                $set: {
                    sort: item.sort,
                },
            },
        },
    }));

    const result = await Category.bulkWrite(bulkOperations);

    if (!result) {
        return reply.send({
            success: false,
            message: 'category_sort_error',
        });
    }

    return reply.send({
        success: true,
        message: 'category_sort_success',
    });
};
