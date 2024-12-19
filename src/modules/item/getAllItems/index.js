const Item = require('../item.model');

module.exports = async (request, reply) => {
    const tenantId = request.tenant._id;
    const { itemId } = request.query;

    const items = await Item
        .find({
            tenant: tenantId,
            parentItem: itemId || null,
            isShowInMenu: true,
        })
        .sort({
            sort: 1,
        })
        .populate('translations.language')
        .populate('prices.currency');

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
