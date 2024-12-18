const Language = require('../language.model');

module.exports = async (request, reply) => {
    const languages = await Language.find({});

    if (languages.length === 0) {
        return reply.send({
            success: false,
            message: 'languages_not_found',
        });
    }

    return reply.send({
        success: true,
        data: languages,
    });
};
