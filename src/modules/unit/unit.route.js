const unitController = require('./unit.controller');
const { PERMISSIONS } = require('../user/user.constant');
const {
    createUnitSchema,
    updateUnitSchema,
    deleteUnitSchema,
    getByIdUnitSchema,
    getAllUnitsSchema,
} = require('./unit.schema');

module.exports = (fastify, opts, done) => {
    fastify.post(
        '/',
        {
            ...createUnitSchema,
            preHandler: [
                fastify.authenticate,
                fastify.authorize(PERMISSIONS.CREATE_UNIT),
            ],
        },
        unitController.create
    );

    fastify.get(
        '/',
        {
            ...getAllUnitsSchema,
            preHandler: [
                fastify.authenticate,
                fastify.authorize(PERMISSIONS.GET_ALL_UNITS),
            ],
        },
        unitController.getAll
    );

    fastify.put(
        '/:id',
        {
            ...updateUnitSchema,
            preHandler: [
                fastify.authenticate,
                fastify.authorize(PERMISSIONS.UPDATE_UNIT),
            ],
        },
        unitController.update
    );

    fastify.delete(
        '/:id',
        {
            ...deleteUnitSchema,
            preHandler: [
                fastify.authenticate,
                fastify.authorize(PERMISSIONS.DELETE_UNIT),
            ],
        },
        unitController.remove
    );

    fastify.get(
        '/:id',
        {
            ...getByIdUnitSchema,
            preHandler: [
                fastify.authenticate,
                fastify.authorize(PERMISSIONS.GET_UNIT),
            ],
        },
        unitController.getById
    );

    done();
};
