const ProductVariant = require('../productVariant.model');
const ItemRelation = require('../../itemRelation/itemRelation.model');
const { mongoose } = require('@lumodine/mongodb');

module.exports = async (request, reply) => {
    const {
        tenantId,
        productVariantId,
    } = request.params;

    const productVariant = await ProductVariant
        .findOne({
            tenant: tenantId,
            _id: productVariantId,
        });

    if (!productVariant) {
        return reply.send({
            success: false,
            message: request.i18n.product_variant_not_found,
        });
    }

    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const isRemoved = await ProductVariant.findByIdAndDelete(productVariant._id, { session });

        const [
            isRemovedRelations,
        ] = await Promise.all([
            ItemRelation.deleteMany({
                $or: [
                    { 'source.item': productVariant._id },
                    { 'target.item': productVariant._id }
                ]
            }, { session }),
        ]);

        if (!isRemoved || !isRemovedRelations) {
            await session.abortTransaction();
            session.endSession();

            return reply.send({
                success: false,
                message: request.i18n.product_variant_remove_error,
            });
        }

        await session.commitTransaction();
        session.endSession();

        return reply.send({
            success: true,
            message: request.i18n.product_variant_remove_success,
        });
    } catch (error) {
        await session.abortTransaction();
        session.endSession();

        return reply.send({
            success: false,
            message: request.i18n.product_variant_remove_error,
        });
    }
};
