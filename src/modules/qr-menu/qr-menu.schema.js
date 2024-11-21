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

const getCategoryByIdSchema = {
    schema: {
        params: {
            type: 'object',
            properties: {
                tenantAlias: {
                    type: 'string',
                },
                categoryId: {
                    type: 'string',
                },
            },
            required: [
                'tenantAlias',
                'categoryId',
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
                categoryId: {
                    type: 'string',
                },
            },
            required: [
                'tenantAlias',
                'categoryId',
            ],
        },
    },
};

module.exports = {
    getDetailSchema,
    getCategoriesSchema,
    getCategoryByIdSchema,
    getProductsSchema,
};
