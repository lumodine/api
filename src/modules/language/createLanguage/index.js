const Language = require('../language.model');

module.exports = async (request, reply) => {
    const {
        name,
        shortName,
        culture,
        direction,
    } = request.body;

    const language = await Language.findOne({
        $or: [
            {
                prefix,
            },
            {
                culture,
            },
        ],
    });

    if (language) {
        return reply.send({
            success: false,
            message: 'language_already_exists',
        });
    }

    const payload = {
        name,
        shortName,
        culture,
        direction,
    };

    const createdLanguage = await (new Language(payload)).save();
    if (!createdLanguage) {
        return reply.send({
            success: false,
            message: 'language_create_error',
        });
    }

    return reply.send({
        success: true,
        message: 'language_create_success',
    });
};
