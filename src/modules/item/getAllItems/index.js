const Item = require('../item.model');

module.exports = async (request, reply) => {
    const tenantId = request.tenant._id;
    const { itemId, kind } = request.query;

    const query = {
        tenant: tenantId,
        isShowInMenu: true,
    };

    if (itemId) {
        query['parentItems.item'] = {
            $in: itemId,
        };
    } else {
        query['parentItems'] = {
            $exists: true,
            $eq: [],
        };
    }

    if (kind) {
        query.kind = kind;
    }

    const items = await Item
        .find(query)
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

    if (items.length === 0) {
        return reply.send({
            success: false,
            message: request.i18n.items_not_found,
        });
    }

    return reply.send({
        success: true,
        data: items,
    });
};
