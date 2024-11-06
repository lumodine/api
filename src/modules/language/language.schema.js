const { LANGUAGE_DIRECTIONS } = require("./language.constant");

const createLanguageSchema = {
    schema: {
        body: {
            type: 'object',
            properties: {
                name: {
                    type: 'string',
                },
                shortName: {
                    type: 'string',
                },
                culture: {
                    type: 'string',
                },
                prefix: {
                    type: 'string',
                },
                flag: {
                    type: 'string',
                },
                direction: {
                    type: 'string',
                    enum: Object.values(LANGUAGE_DIRECTIONS),
                },
            },
            required: [
                'name',
                'shortName',
                'culture',
                'prefix',
                'flag',
                'direction',
            ],
        },
    },
};

const updateLanguageSchema = {
    schema: {
        params: {
            type: 'object',
            properties: {
                id: {
                    type: 'string',
                },
            },
            required: [
                'id',
            ],
        },
        body: {
            type: 'object',
            properties: {
                name: {
                    type: 'string',
                },
                shortName: {
                    type: 'string',
                },
                culture: {
                    type: 'string',
                },
                prefix: {
                    type: 'string',
                },
                flag: {
                    type: 'string',
                },
                direction: {
                    type: 'string',
                    enum: Object.values(LANGUAGE_DIRECTIONS),
                },
            },
            required: [
                'name',
                'shortName',
                'culture',
                'prefix',
                'flag',
                'direction',
            ],
        },
    },
};

const deleteLanguageSchema = {
    schema: {
        params: {
            type: 'object',
            properties: {
                id: {
                    type: 'number',
                },
            },
            required: [
                'id',
            ],
        },
    },
};

const getByIdLanguageSchema = {
    schema: {
        params: {
            type: 'object',
            properties: {
                id: {
                    type: 'string',
                },
            },
            required: [
                'id',
            ],
        },
    },
};

const getAllLanguagesSchema = {};

module.exports = {
    createLanguageSchema,
    updateLanguageSchema,
    deleteLanguageSchema,
    getByIdLanguageSchema,
    getAllLanguagesSchema,
};
