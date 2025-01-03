const Product = require('../product.model');
const ItemRelation = require('../../itemRelation/itemRelation.model');
const { mongoose } = require('@lumodine/mongodb');

module.exports = async (request, reply) => {
    const {
        tenantId,
        productId,
    } = request.params;

    const product = await Product
        .findOne({
            tenant: tenantId,
            _id: productId,
        });

    if (!product) {
        return reply.send({
            success: false,
            message: request.i18n.product_not_found,
        });
    }

    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const isRemoved = await Product.findByIdAndDelete(product._id, { session });

        const [
            isRemovedRelations,
        ] = await Promise.all([
            ItemRelation.deleteMany({
                $or: [
                    { 'source.item': product._id },
                    { 'target.item': product._id }
                ]
            }, { session }),
        ]);

        if (!isRemoved || !isRemovedRelations) {
            await session.abortTransaction();
            session.endSession();

            return reply.send({
                success: false,
                message: request.i18n.product_remove_error,
            });
        }

        await session.commitTransaction();
        session.endSession();

        return reply.send({
            success: true,
            message: request.i18n.product_remove_success,
        });
    } catch (error) {
        await session.abortTransaction();
        session.endSession();

        return reply.send({
            success: false,
            message: request.i18n.product_remove_error,
        });
    }
};
