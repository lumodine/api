const { FONTS } = require('../../theme/theme.constant');

module.exports = async (request, reply) => {
    const fonts = Object.values(FONTS);

    return reply.send({
        success: true,
        data: fonts,
    });
};
