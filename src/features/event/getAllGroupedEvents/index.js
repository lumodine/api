const Event = require('../event.model');
const { mongoose } = require('@lumodine/mongodb');

module.exports = async (request, reply) => {
    const {
        tenant,
        startDate,
        endDate,
    } = request.query;


    const matchStage = {
        tenant: new mongoose.Types.ObjectId(tenant),
    };

    if (startDate || endDate) {
        matchStage.createdAt = {};
        if (startDate) {
            matchStage.createdAt.$gte = new Date(startDate);
        }
        if (endDate) {
            matchStage.createdAt.$lte = new Date(endDate);
        }
    }

    const events = await Event.aggregate([
        {
            $match: matchStage,
        },
        {
            $group: {
                _id: {
                    date: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
                    type: "$type",
                },
                count: { $sum: 1 },
            },
        },
        {
            $group: {
                _id: "$_id.date",
                events: {
                    $push: {
                        type: "$_id.type",
                        count: "$count",
                    },
                },
            },
        },
        {
            $sort: { _id: 1 },
        },
    ]);

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
