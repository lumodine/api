const createUnitSchema = {
    schema: {
        params: {
            type: 'object',
            properties: {
                tenantId: {
                    type: 'string',
                },
            },
            required: [
                'tenantId',
            ],
        },
        body: {
            type: 'object',
            properties: {
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
                tenantId: {
                    type: 'string',
                },
                unitId: {
                    type: 'string',
                },
            },
            required: [
                'tenantId',
                'unitId',
            ],
        },
        body: {
            type: 'object',
            properties: {
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
                tenantId: {
                    type: 'string',
                },
                unitId: {
                    type: 'string',
                },
            },
            required: [
                'tenantId',
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
                tenantId: {
                    type: 'string',
                },
                unitId: {
                    type: 'string',
                },
            },
            required: [
                'tenantId',
                'unitId',
            ],
        },
    },
};

const getAllUnitsSchema = {
    schema: {
        params: {
            type: 'object',
            properties: {
                tenantId: {
                    type: 'string',
                },
            },
            required: [
                'tenantId',
            ],
        },
    },
};

module.exports = {
    createUnitSchema,
    updateUnitSchema,
    deleteUnitSchema,
    getByIdUnitSchema,
    getAllUnitsSchema,
};
