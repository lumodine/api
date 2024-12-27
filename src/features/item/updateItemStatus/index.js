const Item = require('../item.model');

module.exports = async (request, reply) => {
    const {
        tenantId,
        itemId
    } = request.params;
    const { status } = request.body;

    const item = await Item
        .findOne({
            tenant: tenantId,
            _id: itemId,
        });

    if (!item) {
        return reply.send({
            success: false,
            message: request.i18n.item_not_found,
        });
    }

    const updatedItem = await Item.findByIdAndUpdate(
        itemId,
        {
            status,
        },
        {
            new: true,
        }
    );

    if (!updatedItem) {
        return reply.send({
            success: false,
            message: request.i18n.item_status_update_error,
        });
    }

    return reply.send({
        success: true,
        message: request.i18n.item_status_update_success,
    });
};
