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

    if (!item) {
        return reply.send({
            success: false,
            message: request.i18n.item_not_found,
        });
    }

    const relations = await ItemRelation.find({
        $or: [
            { 'target.item': item._id },
            { 'source.item': item._id }
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

    const itemWithRelations = {
        ...item.toObject(),
        parentItems: relations
            .filter(relation => relation.target.item.equals(item._id))
            .map(relation => relation.source.item),
        childItems: relations
            .filter(relation => relation.source.item.equals(item._id))
            .map(relation => relation.target.item)
    };

    return reply.send({
        success: true,
        data: itemWithRelations,
    });
};