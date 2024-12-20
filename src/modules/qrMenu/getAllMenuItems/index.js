const { ITEM_STATUS } = require('../../item/item.constant');
const Item = require('../../item/item.model');

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
        query['parentItems.item'] = {
            $in: itemId,
        };
    }

    const items = await Item
        .find(query)
        .sort({
            sort: 1,
        })
        .populate('translations.language')
        .populate('prices.currency')
        .populate('parentItems.item');

    if (items.length === 0) {
        return reply.send({
            success: false,
            message: 'items_not_found',
        });
    }

    return reply.send({
        success: true,
        data: items,
    });
};
