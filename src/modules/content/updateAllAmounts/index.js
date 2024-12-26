const Product = require('../../product/product.model');
const ProductVariant = require('../../productVariant/productVariant.model');

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
        case 'productVariants':
            Item = ProductVariant;
            break;
        default:
            return reply.send({
                success: false,
                message: request.i18n.content_invalid_type,
            });
    }

    const bulkOperations = [];
    for (const item of items) {
        const existingItem = await Item.findOne({
            _id: item.item,
            "prices.currency": item.currency,
        });

        if (existingItem) {
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
        } else {
            bulkOperations.push({
                updateOne: {
                    filter: {
                        _id: item.item,
                    },
                    update: {
                        $push: {
                            prices: {
                                currency: item.currency,
                                amount: item.amount,
                            },
                        },
                    },
                },
            });
        }
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
