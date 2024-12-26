const Item = require('../item.model');
const ItemRelation = require('../../itemRelation/itemRelation.model');

module.exports = async (request, reply) => {
    const tenantId = request.tenant._id;
    const { itemId, kind } = request.query;

    const query = {
        tenant: tenantId,
        isShowInMenu: true,
    };

    const allRelations = await ItemRelation.find({}).lean();
    const allRelatedItemIds = new Set([
        ...allRelations.map(r => r.sourceItem.toString()),
        ...allRelations.map(r => r.targetItem.toString())
    ]);

    if (itemId) {
        const targetItemIds = allRelations
            .filter(r => itemId.includes(r.sourceItem.toString()))
            .map(r => r.targetItem);
        
        query._id = {
            $in: targetItemIds
        };
    } else {
        query._id = {
            $nin: Array.from(allRelatedItemIds)
        };
    }

    if (kind) {
        query.kind = kind;
    }

    const items = await Item
        .find(query)
        .sort({ sort: 1 })
        .populate([
            { path: 'translations.language' },
            { path: 'prices.currency' }
        ])
        .lean();

    if (items.length === 0) {
        return reply.send({
            success: false,
            message: request.i18n.items_not_found,
        });
    }

    const itemIds = items.map(item => item._id.toString());

    const [sourceItems, targetItems] = await Promise.all([
        Item.find({
            _id: {
                $in: allRelations
                    .filter(r => itemIds.includes(r.targetItem.toString()))
                    .map(r => r.sourceItem)
            }
        })
        .populate([
            { path: 'translations.language' },
            { path: 'prices.currency' }
        ])
        .lean(),
        Item.find({
            _id: {
                $in: allRelations
                    .filter(r => itemIds.includes(r.sourceItem.toString()))
                    .map(r => r.targetItem)
            }
        })
        .populate([
            { path: 'translations.language' },
            { path: 'prices.currency' }
        ])
        .lean()
    ]);

    const sourceItemMap = new Map(sourceItems.map(item => [item._id.toString(), item]));
    const targetItemMap = new Map(targetItems.map(item => [item._id.toString(), item]));

    const itemsWithRelations = items.map(item => {
        const itemId = item._id.toString();
        
        const parentItems = allRelations
            .filter(r => r.targetItem.toString() === itemId)
            .map(r => sourceItemMap.get(r.sourceItem.toString()))
            .filter(Boolean);
        
        const childItems = allRelations
            .filter(r => r.sourceItem.toString() === itemId)
            .map(r => targetItemMap.get(r.targetItem.toString()))
            .filter(Boolean);

        return {
            ...item,
            parentItems,
            childItems,
        };
    });

    return reply.send({
        success: true,
        data: itemsWithRelations,
    });
};
