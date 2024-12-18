const { COLORS } = require('../tenant.constant');

module.exports = async (request, reply) => {
    const colors = Object.values(COLORS);

    return reply.send({
        success: true,
        data: colors,
    });
};
