const Language = require('../language.model');

module.exports = async (request, reply) => {
    const { languageId } = request.params;
    const {
        name,
        shortName,
        culture,
        direction,
    } = request.body;

    const language = await Language.findById(languageId);

    if (!language) {
        return reply.send({
            success: false,
            message: request.i18n.language_not_found,
        });
    }

    const hasLanguage = await Language.findOne({
        _id: {
            $ne: languageId,
        },
        $or: [
            {
                prefix,
            },
            {
                culture,
            },
        ],
    });

    if (hasLanguage) {
        return reply.send({
            success: false,
            message: request.i18n.language_already_exists,
        });
    }

    const payload = {
        name,
        shortName,
        culture,
        direction,
    };

    const updatedLanguage = await Language.findByIdAndUpdate(
        languageId,
        payload,
        {
            new: true,
        }
    );

    if (!updatedLanguage) {
        return reply.send({
            success: false,
            message: request.i18n.language_update_error,
        });
    }

    return reply.send({
        success: true,
        message: request.i18n.language_update_success,
    });
};
