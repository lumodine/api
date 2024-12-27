const Item = require('../item.model');

module.exports = async (request, reply) => {
    const {
        tenantId,
        itemId
    } = request.params;
    const { type } = request.body;

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
            type,
        },
        {
            new: true,
        }
    );

    console.log(tenantId, itemId, type);
    

    if (!updatedItem) {
        return reply.send({
            success: false,
            message: request.i18n.item_type_update_error,
        });
    }

    return reply.send({
        success: true,
        message: request.i18n.item_type_update_success,
    });
};
