const { PRODUCT_STATUS } = require("./product.constant");

const createProductSchema = {
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
                tenantId: {
                    type: 'string',
                },
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
                            currencyId: {
                                type: 'string',
                            },
                            unitId: {
                                type: 'string',
                            },
                            price: {
                                type: 'number',
                            },
                        },
                        required: [
                            'currencyId',
                            'unitId',
                            'price',
                        ],
                    },
                },
            },
            required: [
                'tenantId',
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
                tenantId: {
                    type: 'string',
                },
                productId: {
                    type: 'string',
                },
            },
            required: [
                'tenantId',
                'productId',
            ],
        },
        body: {
            type: 'object',
            properties: {
                tenantId: {
                    type: 'string',
                },
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
                            currencyId: {
                                type: 'string',
                            },
                            unitId: {
                                type: 'string',
                            },
                            price: {
                                type: 'number',
                            },
                        },
                        required: [
                            'currencyId',
                            'unitId',
                            'price',
                        ],
                    },
                },
            },
            required: [
                'tenantId',
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
                tenantId: {
                    type: 'string',
                },
                productId: {
                    type: 'string',
                },
            },
            required: [
                'tenantId',
                'productId',
            ],
        },
    },
};

const getByIdProductSchema = {
    schema: {
        params: {
            type: 'object',
            properties: {
                tenantId: {
                    type: 'string',
                },
                productId: {
                    type: 'string',
                },
            },
            required: [
                'tenantId',
                'productId',
            ],
        },
    },
};

const getAllProductsSchema = {
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

const updateProductSortSchema = {
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
                            productId: {
                                type: 'string',
                            },
                            sort: {
                                type: 'number',
                            },
                        },
                        required: [
                            'productId',
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

const updateProductStatusSchema = {
    schema: {
        params: {
            type: 'object',
            properties: {
                tenantId: {
                    type: 'string',
                },
                productId: {
                    type: 'string',
                },
            },
            required: [
                'tenantId',
                'productId',
            ],
        },
        body: {
            type: 'object',
            properties: {
                status: {
                    type: 'string',
                    enum: Object.values(PRODUCT_STATUS),
                },
            },
            required: [
                'status',
            ],
        },
    },
};

module.exports = {
    createProductSchema,
    updateProductSchema,
    deleteProductSchema,
    getByIdProductSchema,
    getAllProductsSchema,
    updateProductSortSchema,
    updateProductStatusSchema,
};
