const createCategorySchema = {
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
                            description: {
                                type: 'string',
                            },
                        },
                        required: [
                            'languageId',
                            'name',
                        ],
                    },
                },
                image: {
                    type: 'string',
                },
            },
            required: [
                'tenantId',
                'translations',
            ],
        },
    },
};

const updateCategorySchema = {
    schema: {
        params: {
            type: 'object',
            properties: {
                tenantId: {
                    type: 'string',
                },
                categoryId: {
                    type: 'string',
                },
            },
            required: [
                'tenantId',
                'categoryId',
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
                            description: {
                                type: 'string',
                            },
                        },
                        required: [
                            'languageId',
                            'name',
                        ],
                    },
                },
                image: {
                    type: 'string',
                },
            },
            required: [
                'tenantId',
                'translations',
            ],
        },
    },
};

const deleteCategorySchema = {
    schema: {
        params: {
            type: 'object',
            properties: {
                tenantId: {
                    type: 'string',
                },
                categoryId: {
                    type: 'string',
                },
            },
            required: [
                'tenantId',
                'categoryId',
            ],
        },
    },
};

const getByIdCategorySchema = {
    schema: {
        params: {
            type: 'object',
            properties: {
                tenantId: {
                    type: 'string',
                },
                categoryId: {
                    type: 'string',
                },
            },
            required: [
                'tenantId',
                'categoryId',
            ],
        },
    },
};

const getAllCategoriesSchema = {
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

const updateCategorySortSchema = {
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
                items: {
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: {
                            categoryId: {
                                type: 'string',
                            },
                            sort: {
                                type: 'number',
                            },
                        },
                        required: [
                            'categoryId',
                            'sort',
                        ],
                    },
                },
            },
            required: [
                'items',
            ],
        },
    },
};

module.exports = {
    createCategorySchema,
    updateCategorySchema,
    deleteCategorySchema,
    getByIdCategorySchema,
    getAllCategoriesSchema,
    updateCategorySortSchema,
};
