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
    } else {
        query['parentItems'] = {
            $exists: true,
            $eq: [],
        };
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
