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
        getAllUnitsSchema,
        unitController.getAll
    );

    fastify.put(
        '/:unitId',
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
        '/:unitId',
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
        '/:unitId',
        getByIdUnitSchema,
        unitController.getById
    );

    done();
};
