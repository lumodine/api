const Item = require('../../item/item.model');

module.exports = async (request, reply) => {
    const tenantId = request.tenant._id;
    const { itemId } = request.params;

    const item = await Item
        .findOne({
            _id: itemId,
            tenant: tenantId,
            isShowInMenu: true,
        })
        .populate('translations.language');

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
