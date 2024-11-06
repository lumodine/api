const createCurrencySchema = {
    schema: {
        body: {
            type: 'object',
            properties: {
                code: {
                    type: 'string',
                },
                number: {
                    type: 'number',
                },
                symbol: {
                    type: 'string',
                },
            },
            required: [
                'code',
                'number',
                'symbol',
            ],
        },
    },
};

const updateCurrencySchema = {
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
                code: {
                    type: 'string',
                },
                number: {
                    type: 'number',
                },
                symbol: {
                    type: 'string',
                },
            },
            required: [
                'code',
                'number',
                'symbol',
            ],
        },
    },
};

const deleteCurrencySchema = {
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

const getByIdCurrencySchema = {
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

const getAllCurrenciesSchema = {};

module.exports = {
    createCurrencySchema,
    updateCurrencySchema,
    deleteCurrencySchema,
    getByIdCurrencySchema,
    getAllCurrenciesSchema,
};
