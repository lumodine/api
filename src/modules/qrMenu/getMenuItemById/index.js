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

    const sourceRelations = await ItemRelation.find({
        targetItem: item._id
    }).populate({
        path: 'sourceItem',
        populate: [
            { path: 'translations.language' },
            { path: 'prices.currency' }
        ]
    });

    const targetRelations = await ItemRelation.find({
        sourceItem: item._id
    }).populate({
        path: 'targetItem',
        populate: [
            { path: 'translations.language' },
            { path: 'prices.currency' }
        ]
    });

    const itemWithRelations = {
        ...item.toObject(),
        parentItems: sourceRelations.map(relation => relation.sourceItem),
        childItems: targetRelations.map(relation => relation.targetItem)
    };

    return reply.send({
        success: true,
        data: itemWithRelations,
    });
};
