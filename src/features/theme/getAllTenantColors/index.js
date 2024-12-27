const { COLORS } = require('../../theme/theme.constant');

module.exports = async (request, reply) => {
    const colors = Object.values(COLORS);

    return reply.send({
        success: true,
        data: colors,
    });
};
