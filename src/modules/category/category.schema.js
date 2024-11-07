const createCategorySchema = {
    schema: {
        body: {
            type: 'object',
            properties: {
                tenant: {
                    type: 'string',
                },
                products: {
                    type: 'array',
                    items: {
                        type: 'string',
                    },
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
                            description: {
                                type: 'string',
                            },
                        },
                        required: [
                            'language',
                            'name',
                        ],
                    },
                },
                image: {
                    type: 'string',
                },
            },
            required: [
                'tenant',
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
                products: {
                    type: 'array',
                    items: {
                        type: 'string',
                    },
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
                            description: {
                                type: 'string',
                            },
                        },
                        required: [
                            'language',
                            'name',
                        ],
                    },
                },
                image: {
                    type: 'string',
                },
            },
            required: [
                'tenant',
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

const getByIdCategorySchema = {
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

const getAllCategoriesSchema = {};

module.exports = {
    createCategorySchema,
    updateCategorySchema,
    deleteCategorySchema,
    getByIdCategorySchema,
    getAllCategoriesSchema,
};
