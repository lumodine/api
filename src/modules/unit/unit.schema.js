const createUnitSchema = {
    schema: {
        body: {
            type: 'object',
            properties: {
                tenantId: {
                    type: 'string',
                },
                translations: {
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: {
                            languageId: {
                                type: 'string',
                            },
                            name: {
                                type: 'string',
                            },
                        },
                        required: [
                            'languageId',
                            'name',
                        ],
                    },
                },
            },
            required: [
                'tenantId',
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
                unitId: {
                    type: 'string',
                },
            },
            required: [
                'unitId',
            ],
        },
        body: {
            type: 'object',
            properties: {
                tenantId: {
                    type: 'string',
                },
                translations: {
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: {
                            languageId: {
                                type: 'string',
                            },
                            name: {
                                type: 'string',
                            },
                        },
                        required: [
                            'languageId',
                            'name',
                        ],
                    },
                },
            },
            required: [
                'tenantId',
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
                unitId: {
                    type: 'string',
                },
            },
            required: [
                'unitId',
            ],
        },
    },
};

const getByIdUnitSchema = {
    schema: {
        params: {
            type: 'object',
            properties: {
                unitId: {
                    type: 'string',
                },
            },
            required: [
                'unitId',
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
