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

module.exports = {
    getMeSchema,
    getMePermissionsSchema,
    loginSchema,
    registerSchema,
};
