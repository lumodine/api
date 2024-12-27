const Item = require('../item.model');
const ItemRelation = require('../../itemRelation/itemRelation.model');
const { mongoose } = require('@lumodine/mongodb');

module.exports = async (request, reply) => {
    const tenantId = request.tenant._id;
    const { items } = request.body;

    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        let itemIndex = 0;
        for (const item of items) {
            const itemDoc = await Item.create([{
                tenant: tenantId,
                kind: item.kind,
                translations: item.translations,
                prices: item.prices || undefined,
                isShowInMenu: true,
                sort: itemIndex,
            }], { session });

            let subItemIndex = 0;
            for (const subItem of item.items) {
                const subItemDoc = await Item.create([{
                    tenant: tenantId,
                    kind: subItem.kind,
                    translations: subItem.translations,
                    prices: subItem.prices || undefined,
                    isShowInMenu: true,
                    sort: subItemIndex,
                }], { session });

                await ItemRelation.create([{
                    sourceItem: itemDoc[0]._id,
                    targetItem: subItemDoc[0]._id
                }], { session });

                if (item.variants && item.variants.length > 0) {
                    let variantIndex = 0;
                    for (const variant of subItem.variants) {
                        const variantDoc = await Item.create([{
                            tenant: tenantId,
                            kind: variant.kind,
                            translations: variant.translations,
                            prices: variant.prices || undefined,
                            isShowInMenu: true,
                            sort: variantIndex,
                        }], { session });

                        await ItemRelation.create([{
                            sourceItem: subItemDoc[0]._id,
                            targetItem: variantDoc[0]._id
                        }], { session });

                        variantIndex++;
                    }
                }

                subItemIndex++;
            }

            itemIndex++;
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