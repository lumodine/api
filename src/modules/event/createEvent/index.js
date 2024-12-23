const Event = require('../event.model');

module.exports = async (request, reply) => {
    const {
        tenant,
        type,
        payload,
    } = request.body;

    const createdEvent = await (new Event({
        tenant,
        type,
        payload,
    })).save();
    if (!createdEvent) {
        return reply.send({
            success: false,
            message: request.i18n.event_create_error,
        });
    }

    return reply.send({
        success: true,
        message: request.i18n.event_create_success,
    });
};
