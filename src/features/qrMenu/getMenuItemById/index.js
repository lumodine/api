const { ITEM_STATUS } = require('../../item/item.constant');
const Item = require('../../item/item.model');
const ItemRelation = require('../../itemRelation/itemRelation.model');

module.exports = async (request, reply) => {
    const tenantId = request.tenant._id;
    const { itemId } = request.params;

    const item = await Item
        .findOne({
            _id: itemId,
            tenant: tenantId,
            status: {
                $ne: ITEM_STATUS.HIDDEN,
            },
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

    let relations = await ItemRelation.find({
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

    relations = relations.filter(relation => relation.source.item.status !== ITEM_STATUS.HIDDEN);
    relations = relations.filter(relation => relation.target.item.status !== ITEM_STATUS.HIDDEN);

    const sourceRelations = relations.filter(relation => relation.source.item.equals(item._id));
    const targetRelations = relations.filter(relation => relation.target.item.equals(item._id));

    const itemWithRelations = {
        ...item.toObject(),
        parentItems: sourceRelations.map(relation => relation.source.item),
        childItems: targetRelations.map(relation => relation.target.item)
    };

    return reply.send({
        success: true,
        data: itemWithRelations,
    });
};
