const { ITEM_KINDS } = require('../../item/item.constant');
const Item = require('../../item/item.model');
const ItemRelation = require('../../itemRelation/itemRelation.model');
const { mongoose } = require('@lumodine/mongodb');

async function createItemRecursively({ tenantId, itemId, item, sort, session }) {
    const itemDoc = await Item.create([{
        tenant: tenantId,
        kind: item.kind,
        translations: item.translations || undefined,
        prices: item.prices || undefined,
        isShowInMenu: true,
        sort: sort,
    }], { session });

    await ItemRelation.create([{
        source: {
            item: itemId,
            kind: ITEM_KINDS.CATEGORY, // TODO:
        },
        target: {
            item: itemDoc[0]._id,
            kind: item.kind,
        },
    }], { session });

    if (item.items && item.items.length > 0) {
        for (let i = 0; i < item.items.length; i++) {
            const childDoc = await createItemRecursively({ tenantId, itemId, item: item.items[i], sort: i, session });

            await ItemRelation.create([{
                source: {
                    item: itemDoc[0]._id,
                    kind: item.kind,
                },
                target: {
                    item: childDoc[0]._id,
                    kind: item.items[i].kind,
                },
            }], { session });
        }
    }

    return itemDoc;
}

module.exports = async (request, reply) => {
    const tenantId = request.tenant._id;
    const { itemId } = request.params;
    const { items } = request.body;

    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        for (let i = 0; i < items.length; i++) {
            await createItemRecursively({ tenantId, itemId, item: items[i], sort: i, session });
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