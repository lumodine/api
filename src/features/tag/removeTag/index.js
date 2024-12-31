const Tag = require('../tag.model');
const Product = require('../../product/product.model');
const ItemRelation = require('../../itemRelation/itemRelation.model');
const { mongoose } = require('@lumodine/mongodb');

module.exports = async (request, reply) => {
    const {
        tenantId,
        tagId,
    } = request.params;

    const tag = await Tag
        .findOne({
            tenant: tenantId,
            _id: tagId,
        });

    if (!tag) {
        return reply.send({
            success: false,
            message: request.i18n.tag_not_found,
        });
    }

    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const isRemovedTag = await Tag.findByIdAndDelete(tagId, { session });

        const [
            isRemovedRelations,
        ] = await Promise.all([
            ItemRelation.deleteMany({
                $or: [
                    { sourceItem: tagId },
                    { targetItem: tagId }
                ]
            }, { session }),
        ]);

        if (!isRemovedTag || !isRemovedRelations) {
            await session.abortTransaction();
            session.endSession();

            return reply.send({
                success: false,
                message: request.i18n.tag_remove_error,
            });
        }

        await session.commitTransaction();
        session.endSession();

        return reply.send({
            success: true,
            message: request.i18n.tag_remove_success,
        });
    } catch (error) {
        await session.abortTransaction();
        session.endSession();

        return reply.send({
            success: false,
            message: request.i18n.tag_remove_error,
        });
    }
};
