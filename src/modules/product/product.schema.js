const createProductSchema = {
    schema: {
        body: {
            type: 'object',
            properties: {
                tenant: {
                    type: 'string',
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
                categories: {
                    type: 'array',
                    items: {
                        type: 'string',
                    },
                },
                prices: {
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: {
                            currency: {
                                type: 'string',
                            },
                            unit: {
                                type: 'string',
                            },
                            price: {
                                type: 'number',
                            },
                        },
                        required: [
                            'currency',
                            'unit',
                            'price',
                        ],
                    },
                },
            },
            required: [
                'tenant',
                'translations',
                'image',
                'categories',
                'prices',
            ],
        },
    },
};

const updateProductSchema = {
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
                categories: {
                    type: 'array',
                    items: {
                        type: 'string',
                    },
                },
                prices: {
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: {
                            currency: {
                                type: 'string',
                            },
                            unit: {
                                type: 'string',
                            },
                            price: {
                                type: 'number',
                            },
                        },
                        required: [
                            'currency',
                            'unit',
                            'price',
                        ],
                    },
                },
            },
            required: [
                'tenant',
                'translations',
                'image',
                'categories',
                'prices',
            ],
        },
    },
};

const deleteProductSchema = {
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

const getByIdProductSchema = {
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

const getAllProductsSchema = {};

module.exports = {
    createProductSchema,
    updateProductSchema,
    deleteProductSchema,
    getByIdProductSchema,
    getAllProductsSchema,
};
