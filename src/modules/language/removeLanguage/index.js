const Language = require('../language.model');

module.exports = async (request, reply) => {
    const { languageId } = request.params;

    const language = await Language.findById(languageId);

    if (!language) {
        return reply.send({
            success: false,
            message: 'language_not_found',
        });
    }

    const isRemoved = await Language.findByIdAndDelete(language._id);
    if (!isRemoved) {
        return reply.send({
            success: false,
            message: 'language_remove_error',
        });
    }

    return reply.send({
        success: true,
        message: 'language_remove_success',
    });
};
