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
            message: 'item_not_found',
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
            message: 'item_status_error',
        });
    }

    return reply.send({
        success: true,
        message: 'item_status_success',
    });
};
