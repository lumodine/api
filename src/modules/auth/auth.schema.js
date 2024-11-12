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
            },
            required: [
                'email',
                'name',
                'surname',
                'password',
            ],
        },
    },
};

const getMeSchema = {};

const getMePermissionsSchema = {};

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
            },
            required: [
                'password',
            ],
        },
    },
};

module.exports = {
    getMeSchema,
    getMePermissionsSchema,
    loginSchema,
    registerSchema,
    forgotPasswordSchema,
    resetPasswordSchema,
};
