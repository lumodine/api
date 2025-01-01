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

        const updatedProduct = await Product.findByIdAndUpdate(
            productId,
            {
                translations,
                prices,
            },
            {
                new: true,
                session,
            }
        );

        if (!updatedProduct) {
            await session.abortTransaction();
            session.endSession();
            return reply.send({
                success: false,
                message: request.i18n.product_update_error,
            });
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
