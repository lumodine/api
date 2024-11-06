const createUnitSchema = {
    schema: {
        body: {
            type: 'object',
            properties: {
                tenant: {
                    type: 'string',
                },
                translations: {
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: {
                            language: {
                                type: 'string',
                            },
                            name: {
                                type: 'string',
                            },
                        },
                        required: [
                            'language',
                            'name',
                        ],
                    },
                },
            },
            required: [
                'tenant',
                'translations',
            ],
        },
    },
};

const updateUnitSchema = {
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
                tenant: {
                    type: 'string',
                },
                translations: {
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: {
                            language: {
                                type: 'string',
                            },
                            name: {
                                type: 'string',
                            },
                        },
                        required: [
                            'language',
                            'name',
                        ],
                    },
                },
            },
            required: [
                'tenant',
                'translations',
            ],
        },
    },
};

const deleteUnitSchema = {
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

const getByIdUnitSchema = {
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

const getAllUnitsSchema = {};

module.exports = {
    createUnitSchema,
    updateUnitSchema,
    deleteUnitSchema,
    getByIdUnitSchema,
    getAllUnitsSchema,
};
