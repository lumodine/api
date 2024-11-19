const getDetailSchema = {
    schema: {
        params: {
            type: 'object',
            properties: {
                tenantAlias: {
                    type: 'string',
                },
            },
            required: [
                'tenantAlias',
            ],
        },
    },
};

const getCategoriesSchema = {
    schema: {
        params: {
            type: 'object',
            properties: {
                tenantAlias: {
                    type: 'string',
                },
            },
            required: [
                'tenantAlias',
            ],
        },
    },
};

const getProductsSchema = {
    schema: {
        params: {
            type: 'object',
            properties: {
                tenantAlias: {
                    type: 'string',
                },
            },
            required: [
                'tenantAlias',
            ],
        },
    },
};

module.exports = {
    getDetailSchema,
    getCategoriesSchema,
    getProductsSchema,
};
