const { ITEM_STATUS } = require('../../item/item.constant');
const Item = require('../../item/item.model');
const ItemRelation = require('../../itemRelation/itemRelation.model');

module.exports = async (request, reply) => {
    const tenantId = request.tenant._id;
    const { itemId } = request.query;

    const query = {
        tenant: tenantId,
        isShowInMenu: true,
        status: {
            $ne: ITEM_STATUS.HIDDEN,
        },
    };

    if (itemId) {
        const relations = await ItemRelation.find({ 
            sourceItem: { 
                $in: itemId 
            } 
        });
        const relatedItemIds = relations.map(relation => relation.targetItem);
        
        query._id = {
            $in: relatedItemIds
        };
    } else {
        const relations = await ItemRelation.find({});
        const relatedItemIds = relations.map(relation => relation.targetItem);
        
        query._id = {
            $nin: relatedItemIds
        };
    }

    const items = await Item
        .find(query)
        .sort({
            sort: 1,
        })
        .populate([
            {
                path: 'translations.language',
            },
            {
                path: 'prices.currency',
            }
        ]);

    const itemIds = items.map(item => item._id);
    
    let relations = await ItemRelation.find({
        $or: [
            { targetItem: { $in: itemIds } },
            { sourceItem: { $in: itemIds } }
        ]
    }).populate([
        {
            path: 'sourceItem',
            populate: [
                { path: 'translations.language' },
                { path: 'prices.currency' }
            ]
        },
        {
            path: 'targetItem',
            populate: [
                { path: 'translations.language' },
                { path: 'prices.currency' }
            ]
        }
    ]);

    relations = relations.filter(relation => relation.sourceItem.status !== ITEM_STATUS.HIDDEN);
    relations = relations.filter(relation => relation.targetItem.status !== ITEM_STATUS.HIDDEN);

    const itemsWithRelations = items.map(item => {
        const sourceRelations = relations.filter(relation => relation.targetItem.equals(item._id));
        const targetRelations = relations.filter(relation => relation.sourceItem.equals(item._id));

        return {
            ...item.toObject(),
            parentItems: sourceRelations.map(relation => relation.sourceItem),
            childItems: targetRelations.map(relation => relation.targetItem)
        };
    });

    if (itemsWithRelations.length === 0) {
        return reply.send({
            success: false,
            message: request.i18n.items_not_found,
        });
    }

    return reply.send({
        success: true,
        data: itemsWithRelations,
    });
};
