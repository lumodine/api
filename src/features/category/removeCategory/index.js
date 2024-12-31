const Category = require('../category.model');
const Item = require('../../item/item.model');
const ItemRelation = require('../../itemRelation/itemRelation.model');
const { mongoose } = require('@lumodine/mongodb');

module.exports = async (request, reply) => {
    const {
        tenantId,
        categoryId,
    } = request.params;

    const category = await Category
        .findOne({
            tenant: tenantId,
            _id: categoryId,
        });

    if (!category) {
        return reply.send({
            success: false,
            message: request.i18n.category_not_found,
        });
    }

    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const relations = await ItemRelation.find({
            sourceItem: categoryId,
        }, null, { session });
        const relatedItemIds = relations.map(relation => relation.targetItem);

        const [
            isRemovedCategory,
            isRemovedItems,
            isRemovedRelations,
        ] = await Promise.all([
            Category.findByIdAndDelete(categoryId, { session }),
            Item.deleteMany({
                _id: {
                    $in: relatedItemIds,
                },
            }, { session }),
            ItemRelation.deleteMany({
                $or: [
                    { sourceItem: categoryId },
                    { targetItem: categoryId }
                ]
            }, { session }),
        ]);

        if (!isRemovedCategory || !isRemovedItems || !isRemovedRelations) {
            await session.abortTransaction();
            session.endSession();

            return reply.send({
                success: false,
                message: request.i18n.category_remove_error,
            });
        }

        await session.commitTransaction();
        session.endSession();

        return reply.send({
            success: true,
            message: request.i18n.category_remove_success,
        });
    } catch (error) {
        await session.abortTransaction();
        session.endSession();

        return reply.send({
            success: false,
            message: request.i18n.category_remove_error,
        });
    }
};
