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
                address: {
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
                'address',
                'languages',
                'currencies',
            ],
        },
    },
};

const updateTenantSchema = {
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
                logo: {
                    type: 'string',
                },
                background: {
                    type: 'string',
                },
                address: {
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
                'address',
                'languages',
                'currencies',
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

module.exports = {
    createTenantSchema,
    updateTenantSchema,
    deleteTenantSchema,
    getByIdTenantSchema,
    getAllTenantsSchema,
};
