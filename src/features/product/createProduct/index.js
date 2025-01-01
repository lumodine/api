const Product = require('../product.model');
const ItemRelation = require('../../itemRelation/itemRelation.model');
const { mongoose } = require('@lumodine/mongodb');
const { ITEM_KINDS } = require('../../item/item.constant');

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

    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const product = await Product.create([{
            tenant: tenantId,
            translations,
            prices,
            image,
            type,
        }], { session });

        if (!product || !product[0]) {
            await session.abortTransaction();
            session.endSession();
            return reply.send({
                success: false,
                message: request.i18n.product_create_error,
            });
        }

        const productId = product[0]._id;

        const relationPromises = [];
        
        if (category) {
            relationPromises.push(
                ItemRelation.create([{
                    source: {
                        item: category,
                        kind: ITEM_KINDS.CATEGORY,
                    },
                    target: {
                        item: productId,
                        kind: ITEM_KINDS.PRODUCT,
                    },
                }], { session })
            );
        }

        if (tags && tags.length > 0) {
            relationPromises.push(
                ItemRelation.create(
                    tags.map(tagId => ({
                        source: {
                            item: tagId,
                            kind: ITEM_KINDS.TAG,
                        },
                        target: {
                            item: productId,
                            kind: ITEM_KINDS.PRODUCT,
                        },
                    })),
                    { session }
                )
            );
        }

        if (relationPromises.length > 0) {
            await Promise.all(relationPromises);
        }

        await session.commitTransaction();
        session.endSession();

        return reply.send({
            success: true,
            message: request.i18n.product_create_success,
        });
    } catch (error) {
        await session.abortTransaction();
        session.endSession();

        return reply.send({
            success: false,
            message: request.i18n.product_create_error,
        });
    }
};
