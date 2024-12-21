const Language = require('../language.model');

module.exports = async (request, reply) => {
    const { languageId } = request.params;

    const language = await Language.findById(languageId);

    if (!language) {
        return reply.send({
            success: false,
            message: request.i18n.language_not_found,
        });
    }

    return reply.send({
        success: true,
        data: language,
    });
};
