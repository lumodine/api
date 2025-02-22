const SubCategory = require('../subCategory.model');
const ItemRelation = require('../../itemRelation/itemRelation.model');
const { mongoose } = require('@lumodine/mongodb');

module.exports = async (request, reply) => {
    const {
        tenantId,
        subCategoryId,
    } = request.params;

    const subCategory = await SubCategory
        .findOne({
            tenant: tenantId,
            _id: subCategoryId,
        });

    if (!subCategory) {
        return reply.send({
            success: false,
            message: request.i18n.sub_category_not_found,
        });
    }

    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const isRemovedSubCategory = await SubCategory.findByIdAndDelete(subCategoryId, { session });

        const [
            isRemovedRelations,
        ] = await Promise.all([
            ItemRelation.deleteMany({
                $or: [
                    { 'source.item': subCategoryId },
                    { 'target.item': subCategoryId }
                ]
            }, { session }),
        ]);

        if (!isRemovedSubCategory || !isRemovedRelations) {
            await session.abortTransaction();
            session.endSession();

            return reply.send({
                success: false,
                message: request.i18n.sub_category_remove_error,
            });
        }

        await session.commitTransaction();
        session.endSession();

        return reply.send({
            success: true,
            message: request.i18n.sub_category_remove_success,
        });
    } catch (error) {
        await session.abortTransaction();
        session.endSession();

        return reply.send({
            success: false,
            message: request.i18n.sub_category_remove_error,
        });
    }
};
