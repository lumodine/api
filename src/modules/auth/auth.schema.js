const loginSchema = {
    schema: {
        body: {
            type: 'object',
            properties: {
                email: {
                    type: 'string',
                },
                password: {
                    type: 'string',
                },
            },
            required: [
                'email',
                'password',
            ],
        },
    },
};

const registerSchema = {
    schema: {
        body: {
            type: 'object',
            properties: {
                email: {
                    type: 'string',
                },
                name: {
                    type: 'string',
                },
                surname: {
                    type: 'string',
                },
                password: {
                    type: 'string',
                },
                confirmPassword: {
                    type: 'string',
                },
            },
            required: [
                'email',
                'name',
                'surname',
                'password',
                'confirmPassword',
            ],
        },
    },
};

const getMeSchema = {};

const forgotPasswordSchema = {
    schema: {
        body: {
            type: 'object',
            properties: {
                email: {
                    type: 'string',
                },
            },
            required: [
                'email',
            ],
        },
    },
};

const resetPasswordSchema = {
    schema: {
        query: {
            type: 'object',
            properties: {
                token: {
                    type: 'string',
                },
            },
            required: [
                't',
            ],
        },
        body: {
            type: 'object',
            properties: {
                password: {
                    type: 'string',
                },
                confirmPassword: {
                    type: 'string',
                },
            },
            required: [
                'password',
                'confirmPassword',
            ],
        },
    },
};

module.exports = {
    getMeSchema,
    loginSchema,
    registerSchema,
    forgotPasswordSchema,
    resetPasswordSchema,
};
