const Item = require('../../item/item.model');
const ItemRelation = require('../../itemRelation/itemRelation.model');
const { mongoose } = require('@lumodine/mongodb');

async function createItemRecursively({ tenantId, item, sort, session }) {
    const itemDoc = await Item.create([{
        tenant: tenantId,
        kind: item.kind,
        translations: item.translations || undefined,
        prices: item.prices || undefined,
        isShowInMenu: true,
        sort: sort,
    }], { session });

    if (item.items && item.items.length > 0) {
        for (let i = 0; i < item.items.length; i++) {
            const childDoc = await createItemRecursively({ tenantId, item: item.items[i], sort: i, session });

            await ItemRelation.create([{
                sourceItem: itemDoc[0]._id,
                targetItem: childDoc[0]._id,
            }], { session });
        }
    }

    return itemDoc;
}

module.exports = async (request, reply) => {
    const tenantId = request.tenant._id;
    const { items } = request.body;

    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        for (let i = 0; i < items.length; i++) {
            await createItemRecursively({ tenantId, item: items[i], sort: i, session });
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