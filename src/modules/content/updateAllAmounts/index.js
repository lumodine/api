const Product = require('../../product/product.model');

module.exports = async (request, reply) => {
    const {
        type,
        items,
    } = request.body;

    let Item;
    switch (type) {
        case 'products':
            Item = Product;
            break;
        default:
            return reply.send({
                success: false,
                message: request.i18n.content_invalid_type,
            });
    }

    const bulkOperations = [];
    for (const item of items) {
        // TODO: check currency not exist and add new currency
        bulkOperations.push({
            updateOne: {
                filter: {
                    _id: item.item,
                    "prices.currency": item.currency,
                },
                update: {
                    $set: {
                        "prices.$.amount": item.amount,
                    },
                },
            },
        });
    }

    const result = await Item.bulkWrite(bulkOperations);

    if (!result) {
        return reply.send({
            success: false,
            message: request.i18n.content_update_all_amounts_error,
        });
    }

    return reply.send({
        success: true,
        message: request.i18n.content_update_all_amounts_success,
    });
};
