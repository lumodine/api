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

const updateTenantCurrencySettingsSchema = {
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
                'currencies',
            ],
        },
    },
};

const updateTenantThemeSchema = {
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
                theme: {
                    type: 'string',
                },
            },
            required: [
                'theme',
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

const getAllTenantThemesSchema = {};

module.exports = {
    createTenantSchema,
    updateTenantSettingsSchema,
    updateTenantLanguageSettingsSchema,
    updateTenantCurrencySettingsSchema,
    updateTenantThemeSchema,
    deleteTenantSchema,
    getByIdTenantSchema,
    getAllTenantsSchema,
    getAliasByIdTenantSchema,
    getAllTenantThemesSchema,
};
