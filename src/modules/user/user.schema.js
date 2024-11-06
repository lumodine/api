const { USER_ROLES } = require("../user/user.constant");

const createUserSchema = {
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
                role: {
                    type: 'string',
                    enum: Object.values(USER_ROLES),
                },
            },
            required: [
                'email',
                'name',
                'surname',
                'password',
                'role',
            ],
        },
    },
};

const updateUserSchema = {
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
                role: {
                    type: 'string',
                    enum: Object.values(USER_ROLES),
                },
            },
            required: [
                'email',
                'name',
                'surname',
                'password',
                'role',
            ],
        },
    },
};

const deleteUserSchema = {
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

const getByIdUserSchema = {
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

const getAllUsersSchema = {};

module.exports = {
    createUserSchema,
    updateUserSchema,
    deleteUserSchema,
    getByIdUserSchema,
    getAllUsersSchema,
};
