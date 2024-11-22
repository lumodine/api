const createTenantSchema = {
    schema: {
        body: {
            type: 'object',
            properties: {
                alias: {
                    type: 'string',
                },
                name: {
                    type: 'string',
                },
                logo: {
                    type: 'string',
                },
                background: {
                    type: 'string',
                },
                theme: {
                    type: 'string',
                },
                languages: {
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: {
                            _id: {
                                type: 'string',
                            },
                            isDefault: {
                                type: 'boolean',
                            },
                        },
                        required: [
                            '_id',
                            'isDefault',
                        ],
                    },
                },
                currencies: {
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: {
                            _id: {
                                type: 'string',
                            },
                            isDefault: {
                                type: 'boolean',
                            },
                        },
                        required: [
                            '_id',
                            'isDefault',
                        ],
                    },
                },
            },
            required: [
                'alias',
                'name',
                'languages',
                'currencies',
            ],
        },
    },
};

const updateTenantSettingsSchema = {
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
                alias: {
                    type: 'string',
                },
                name: {
                    type: 'string',
                },
                address: {
                    type: 'string',
                },
            },
            required: [
                'alias',
                'name',
            ],
        },
    },
};

const updateTenantLanguageSettingsSchema = {
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
                languages: {
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: {
                            _id: {
                                type: 'string',
                            },
                            isDefault: {
                                type: 'boolean',
                            },
                        },
                        required: [
                            '_id',
                            'isDefault',
                        ],
                    },
                },
            },
            required: [
                'languages',
            ],
        },
    },
};

const deleteTenantSchema = {
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

const getByIdTenantSchema = {
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

const getAllTenantsSchema = {};

const getAliasByIdTenantSchema = {
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
    createTenantSchema,
    updateTenantSettingsSchema,
    updateTenantLanguageSettingsSchema,
    deleteTenantSchema,
    getByIdTenantSchema,
    getAllTenantsSchema,
    getAliasByIdTenantSchema,
};
