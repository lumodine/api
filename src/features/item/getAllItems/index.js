const Item = require('../item.model');
const ItemRelation = require('../../itemRelation/itemRelation.model');

module.exports = async (request, reply) => {
    const tenantId = request.tenant._id;
    const { itemId, kind } = request.query;

    const query = {
        tenant: tenantId,
        isShowInMenu: true,
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

    if (kind) {
        query.kind = kind;
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
    
    const sourceRelations = await ItemRelation.find({
        targetItem: { $in: itemIds }
    }).populate({
        path: 'sourceItem',
        populate: [
            { path: 'translations.language' },
            { path: 'prices.currency' }
        ]
    });

    const targetRelations = await ItemRelation.find({
        sourceItem: { $in: itemIds }
    }).populate({
        path: 'targetItem',
        populate: [
            { path: 'translations.language' },
            { path: 'prices.currency' }
        ]
    });

    const itemsWithRelations = items.map(item => {
        const sourceItems = sourceRelations
            .filter(relation => relation.targetItem.equals(item._id))
            .map(relation => relation.sourceItem);
        
        const targetItems = targetRelations
            .filter(relation => relation.sourceItem.equals(item._id))
            .map(relation => relation.targetItem);

        return {
            ...item.toObject(),
            parentItems: sourceItems,
            childItems: targetItems,
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