const Announcement = require('../announcement.model');

module.exports = async (request, reply) => {
    const { items } = request.body;

    const bulkOperations = items.map(item => ({
        updateOne: {
            filter: {
                _id: item.announcementId,
            },
            update: {
                $set: {
                    sort: item.sort,
                },
            },
        },
    }));

    const result = await Announcement.bulkWrite(bulkOperations);

    if (!result) {
        return reply.send({
            success: false,
            message: 'announcement_sort_error',
        });
    }

    return reply.send({
        success: true,
        message: 'announcement_sort_success',
    });
};
