const Product = require('../product.model');
const ItemRelation = require('../../itemRelation/itemRelation.model');
const { mongoose } = require('@lumodine/mongodb');
const { ITEM_KINDS } = require('../../item/item.constant');

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

    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const product = await Product
            .findOne({
                tenant: tenantId,
                _id: productId,
            }, null, { session });

        if (!product) {
            await session.abortTransaction();
            session.endSession();
            return reply.send({
                success: false,
                message: request.i18n.product_not_found,
            });
        }

        const [updatedProduct] = await Promise.all([
            Product.findByIdAndUpdate(
                productId,
                {
                    translations,
                    prices,
                    image,
                    type,
                },
                {
                    new: true,
                    session,
                }
            ),
            ItemRelation.deleteMany({
                'target.item': productId
            }, { session })
        ]);

        if (!updatedProduct) {
            await session.abortTransaction();
            session.endSession();
            return reply.send({
                success: false,
                message: request.i18n.product_update_error,
            });
        }

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
            message: request.i18n.product_update_success,
        });
    } catch (error) {
        await session.abortTransaction();
        session.endSession();

        return reply.send({
            success: false,
            message: request.i18n.product_update_error,
        });
    }
};
