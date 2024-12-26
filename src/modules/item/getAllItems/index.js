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
