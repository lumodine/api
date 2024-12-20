const Item = require('../item.model');

module.exports = async (request, reply) => {
    const tenantId = request.tenant._id;
    const { itemId } = request.params;

    const query = {
        tenant: tenantId,
        isShowInMenu: true,
    };

    if (itemId) {
        query['parentItems.item'] = {
            $in: itemId,
        };
    }

    const item = await Item
        .findOne(query)
        .sort({
            sort: 1,
        })
        .populate('translations.language')
        .populate('prices.currency')
        .populate('parentItems.item');

    if (!item) {
        return reply.send({
            success: false,
            message: 'item_not_found',
        });
    }

    return reply.send({
        success: true,
        data: item,
    });
};
