const Item = require('../item.model');
const ItemRelation = require('../../itemRelation/itemRelation.model');
const { mongoose } = require('@lumodine/mongodb');

module.exports = async (request, reply) => {
    const tenantId = request.tenant._id;
    const { categories } = request.body;

    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        let categoryIndex = 0;
        for (const category of categories) {
            const categoryDoc = await Item.create([{
                tenant: tenantId,
                kind: category.kind,
                translations: category.translations,
                isShowInMenu: true,
                sort: categoryIndex,
            }], { session });

            // Create sub-categories
            let itemIndex = 0;
            for (const item of category.items) {
                const itemDoc = await Item.create([{
                    tenant: tenantId,
                    kind: item.kind,
                    translations: item.translations,
                    prices: item.prices || undefined,
                    isShowInMenu: true,
                    sort: itemIndex,
                }], { session });

                // Create relation between category and sub-category
                await ItemRelation.create([{
                    sourceItem: categoryDoc[0]._id,
                    targetItem: itemDoc[0]._id
                }], { session });

                if (item.variants && item.variants.length > 0) {
                    let variantIndex = 0;
                    for (const variant of item.variants) {
                        const variantDoc = await Item.create([{
                            tenant: tenantId,
                            kind: variant.kind,
                            translations: variant.translations,
                            prices: variant.prices || undefined,
                            isShowInMenu: true,
                            sort: variantIndex,
                        }], { session });

                        // Create relation between product and variant
                        await ItemRelation.create([{
                            sourceItem: itemDoc[0]._id,
                            targetItem: variantDoc[0]._id
                        }], { session });

                        variantIndex++;
                    }
                }

                itemIndex++;
            }

            categoryIndex++;
        }

        await session.commitTransaction();
        session.endSession();

        return reply.send({
            success: true,
            message: request.i18n.menu_create_success,
        });
    } catch (error) {
        await session.abortTransaction();
        session.endSession();

        return reply.send({
            success: false,
            message: request.i18n.menu_create_error,
        });
    }
}; 