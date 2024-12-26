const { ITEM_STATUS } = require('../../item/item.constant');
const Item = require('../../item/item.model');

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
            },
            {
                path: 'childItems.item',
                populate: [
                    {
                        path: 'translations.language',
                    },
                    {
                        path: 'prices.currency',
                    },
                ],
            },
            {
                path: 'parentItems.item',
                populate: [
                    {
                        path: 'translations.language',
                    },
                    {
                        path: 'prices.currency',
                    },
                ],
            }
        ]);

    if (!item) {
        return reply.send({
            success: false,
            message: request.i18n.item_not_found,
        });
    }

    return reply.send({
        success: true,
        data: item,
    });
};
