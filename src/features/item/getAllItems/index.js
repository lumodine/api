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
            'source.item': itemId,
        });
        const relatedItemIds = relations.map(relation => relation.target.item);
        
        query._id = {
            $in: relatedItemIds
        };
    } else {
        const relations = await ItemRelation.find({});
        const relatedItemIds = relations.map(relation => relation.target.item);
        
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
    
    const relations = await ItemRelation.find({
        $or: [
            { 'target.item': { $in: itemIds } },
            { 'source.item': { $in: itemIds } }
        ]
    }).populate([
        {
            path: 'source.item',
            populate: [
                { path: 'translations.language' },
                { path: 'prices.currency' }
            ]
        },
        {
            path: 'target.item',
            populate: [
                { path: 'translations.language' },
                { path: 'prices.currency' }
            ]
        }
    ]);

    const itemsWithRelations = items.map(item => {
        const sourceItems = relations
            .filter(relation => relation.target.item.equals(item._id))
            .map(relation => relation.source.item);
        
        const targetItems = relations
            .filter(relation => relation.source.item.equals(item._id))
            .map(relation => relation.target.item);

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