const Item = require('../item.model');

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
        .populate('translations.language')
        .populate('prices.currency')
        .populate({
            path: 'parentItems.item',
            populate: {
                path: 'translations.language',
            },
        });

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
