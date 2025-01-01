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

    relations = relations.filter(relation => relation.source.item.status !== ITEM_STATUS.HIDDEN);
    relations = relations.filter(relation => relation.target.item.status !== ITEM_STATUS.HIDDEN);

    const itemsWithRelations = items.map(item => {
        const sourceRelations = relations.filter(relation => relation.target.item.equals(item._id));
        const targetRelations = relations.filter(relation => relation.source.item.equals(item._id));

        return {
            ...item.toObject(),
            parentItems: sourceRelations.map(relation => relation.source.item),
            childItems: targetRelations.map(relation => relation.target.item)
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
