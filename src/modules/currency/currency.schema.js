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
                currencyId: {
                    type: 'string',
                },
            },
            required: [
                'currencyId',
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
                currencyId: {
                    type: 'string',
                },
            },
            required: [
                'currencyId',
            ],
        },
    },
};

const getByIdCurrencySchema = {
    schema: {
        params: {
            type: 'object',
            properties: {
                currencyId: {
                    type: 'string',
                },
            },
            required: [
                'currencyId',
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
