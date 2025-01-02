const Product = require('../product.model');
const ItemRelation = require('../../itemRelation/itemRelation.model');
const { mongoose } = require('@lumodine/mongodb');
const { ITEM_KINDS } = require('../../item/item.constant');

module.exports = async (request, reply) => {
    const {
        tenantId,
        productId
    } = request.params;

    const {
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

        await ItemRelation.deleteMany({
            'source.kind': ITEM_KINDS.TAG,
            target: {
                item: product._id,
                kind: ITEM_KINDS.PRODUCT,
            },
        }, { session });

        await ItemRelation.create(
            tags.map(tagId => ({
                source: {
                    item: tagId,
                    kind: ITEM_KINDS.TAG,
                },
                target: {
                    item: product._id,
                    kind: ITEM_KINDS.PRODUCT,
                },
            })),
            { session }
        );

        await session.commitTransaction();
        session.endSession();

        return reply.send({
            success: true,
            message: request.i18n.product_update_tags_success,
        });
    } catch (error) {
        await session.abortTransaction();
        session.endSession();

        return reply.send({
            success: false,
            message: request.i18n.product_update_tags_error,
        });
    }
};