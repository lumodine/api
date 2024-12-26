const Item = require('../item.model');
const ItemRelation = require('../../itemRelation/itemRelation.model');

module.exports = async (request, reply) => {
    const tenantId = request.tenant._id;
    const { itemId, kind } = request.params;

    const query = {
        tenant: tenantId,
        _id: itemId,
        isShowInMenu: true,
    };

    if (kind) {
        query.kind = kind;
    }

    const item = await Item
        .findOne(query)
        .sort({ sort: 1 })
        .populate([
            { path: 'translations.language' },
            { path: 'prices.currency' }
        ])
        .lean();

    if (!item) {
        return reply.send({
            success: false,
            message: request.i18n.item_not_found,
        });
    }

    const [relations, [sourceItems, targetItems]] = await Promise.all([
        ItemRelation.find({
            $or: [
                { sourceItem: itemId },
                { targetItem: itemId }
            ]
        }).lean(),
        Promise.all([
            Item.find({
                _id: {
                    $in: await ItemRelation.distinct('sourceItem', { targetItem: itemId })
                }
            })
            .populate([
                { path: 'translations.language' },
                { path: 'prices.currency' }
            ])
            .lean(),
            Item.find({
                _id: {
                    $in: await ItemRelation.distinct('targetItem', { sourceItem: itemId })
                }
            })
            .populate([
                { path: 'translations.language' },
                { path: 'prices.currency' }
            ])
            .lean()
        ])
    ]);

    const itemWithRelations = {
        ...item,
        parentItems: sourceItems,
        childItems: targetItems
    };

    return reply.send({
        success: true,
        data: itemWithRelations,
    });
};
