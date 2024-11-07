const Language = require('./language.model');

const create = async (name, shortName, culture, prefix, flag, direction) => {
    const payload = {
        name,
        shortName,
        culture,
        prefix,
        flag,
        direction,
    };

    const language = await (new Language(payload)).save();

    if (!language) {
        return {
            success: false,
            message: 'language_create_error'
        };
    }

    return {
        success: true,
        message: 'language_create_success',
        data: language,
    };
};

const update = async (id, name, shortName, culture, prefix, flag, direction) => {
    const hasLanguage = await Language
        .findOne(
            {
                _id: id,
            }
        );

    if (!hasLanguage) {
        return {
            success: false,
            message: 'language_not_found'
        };
    }

    const payload = {
        name,
        shortName,
        culture,
        prefix,
        flag,
        direction,
    };

    const newLanguage = await Language
        .findByIdAndUpdate(
            id,
            payload,
            {
                new: true,
            }
        );

    if (!newLanguage) {
        return {
            success: false,
            message: 'language_update_error'
        };
    }

    return {
        success: true,
        message: 'language_update_success',
        data: newLanguage,
    };
};

const remove = async (id) => {
    const hasLanguage = await Language
        .findOne(
            {
                _id: id,
            }
        );

    if (!hasLanguage) {
        return {
            success: false,
            message: 'language_not_found'
        };
    }

    const isRemoved = await Language
        .findByIdAndDelete(id);

    if (!isRemoved) {
        return {
            success: false,
            message: 'language_remove_error'
        };
    }

    return {
        success: true,
        message: 'language_remove_success',
    };
};

const getAll = async () => {
    const items = await Language
        .find({});

    if (items.length == 0) {
        return {
            success: false,
            message: 'languages_not_found',
        };
    }

    return {
        success: true,
        data: items,
    };
};

const getById = async (id) => {
    const language = await Language
        .findOne(
            {
                _id: id,
            }
        );

    if (!language) {
        return {
            success: false,
            message: 'language_not_found'
        };
    }

    return {
        success: true,
        data: language,
    };
};

module.exports = {
    create,
    update,
    remove,
    getAll,
    getById,
};
