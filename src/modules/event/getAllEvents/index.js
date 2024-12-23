const Event = require('../event.model');

module.exports = async (request, reply) => {
    const {
        tenant,
        type,
        startDate,
        endDate,
    } = request.query;

    const query = { tenant };

    if (type) {
        query.type = type;
    }

    if (startDate && endDate) {
        query.createdAt = {
            $gte: new Date(startDate),
            $lte: new Date(endDate),
        };
    }

    const events = await Event.find(query).sort({ createdAt: -1 });

    if (!events) {
        return reply.send({
            success: false,
            message: request.i18n.events_not_found,
        });
    }

    return reply.send({
        success: true,
        data: events,
    });
};
