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
                defaultLanguage: {
                    type: 'string',
                },
                languages: {
                    type: 'array',
                    items: {
                        type: 'string',
                    },
                },
                defaultCurrency: {
                    type: 'string',
                },
                currencies: {
                    type: 'array',
                    items: {
                        type: 'string',
                    },
                },
            },
            required: [
                'alias',
                'name',
                'address',
                'defaultLanguage',
                'languages',
                'defaultCurrency',
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
                defaultLanguage: {
                    type: 'string',
                },
                languages: {
                    type: 'array',
                    items: {
                        type: 'string',
                    },
                },
                defaultCurrency: {
                    type: 'string',
                },
                currencies: {
                    type: 'array',
                    items: {
                        type: 'string',
                    },
                },
            },
            required: [
                'alias',
                'name',
                'address',
                'defaultLanguage',
                'languages',
                'defaultCurrency',
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

const getByIdTenantSchema = {
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

const getAllTenantsSchema = {};

module.exports = {
    createTenantSchema,
    updateTenantSchema,
    deleteTenantSchema,
    getByIdTenantSchema,
    getAllTenantsSchema,
};
