const Language = require('./language.model');

const create = async (request, reply) => {
    const {
        name,
        shortName,
        culture,
        prefix,
        flag,
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
        prefix,
        flag,
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

const update = async (request, reply) => {
    const { languageId } = request.params;
    const {
        name,
        shortName,
        culture,
        prefix,
        flag,
        direction,
    } = request.body;

    const language = await Language.findById(languageId);

    if (!language) {
        return reply.send({
            success: false,
            message: 'language_not_found',
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
            message: 'language_already_exists',
        });
    }

    const payload = {
        name,
        shortName,
        culture,
        prefix,
        flag,
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
            message: 'language_update_error',
        });
    }

    return reply.send({
        success: true,
        data: updatedLanguage,
    });
};

const remove = async (request, reply) => {
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

const getAll = async (request, reply) => {
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

const getById = async (request, reply) => {
    const { languageId } = request.params;

    const language = await Language.findById(languageId);

    if (!language) {
        return reply.send({
            success: false,
            message: 'language_not_found',
        });
    }

    return reply.send({
        success: true,
        data: language,
    });
};

module.exports = {
    create,
    update,
    remove,
    getAll,
    getById,
};
