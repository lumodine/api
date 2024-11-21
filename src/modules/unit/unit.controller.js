const Unit = require('./unit.model');
const Tenant = require('../tenant/tenant.model');

const create = async (request, reply) => {
    const {
        tenantId,
        translations,
    } = request.body;

    //TODO: check translations.languageId

    const payload = {
        tenantId,
        translations,
    };

    const createdUnit = await (new Unit(payload)).save();
    if (!createdUnit) {
        return reply.send({
            success: false,
            message: 'unit_create_error',
        });
    }

    return reply.send({
        success: true,
        message: 'unit_create_success',
    });
};

const update = async (request, reply) => {
    const {
        tenantId,
        unitId,
    } = request.params;
    const {
        translations,
    } = request.body;

    const unit = await Unit
        .findOne({
            tenantId,
            _id: unitId,
        });

    if (!unit) {
        return reply.send({
            success: false,
            message: 'unit_not_found',
        });
    }

    //TODO: check translations.languageId

    const payload = {
        tenantId,
        translations,
    };

    const updatedUnit = await Unit.findByIdAndUpdate(
        unitId,
        payload,
        {
            new: true,
        }
    );

    if (!updatedUnit) {
        return reply.send({
            success: false,
            message: 'unit_update_error',
        });
    }

    return reply.send({
        success: true,
        data: updatedUnit,
    });
};

const remove = async (request, reply) => {
    const {
        tenantId,
        unitId,
    } = request.params;

    const unit = await Unit
        .findOne({
            tenantId,
            _id: unitId,
        });

    if (!unit) {
        return reply.send({
            success: false,
            message: 'unit_not_found',
        });
    }

    const isRemoved = await Unit.findByIdAndDelete(unit._id);
    if (!isRemoved) {
        return reply.send({
            success: false,
            message: 'unit_remove_error',
        });
    }

    return reply.send({
        success: true,
        message: 'unit_remove_success',
    });
};

const getAll = async (request, reply) => {
    const { tenantId } = request.params;
    const units = await Unit
        .find({
            tenantId,
        });

    if (units.length === 0) {
        return reply.send({
            success: false,
            message: 'units_not_found',
        });
    }

    return reply.send({
        success: true,
        data: units,
    });
};

const getById = async (request, reply) => {
    const {
        tenantId,
        unitId
    } = request.params;

    const unit = await Unit
        .findOne({
            tenantId,
            _id: unitId,
        });

    if (!unit) {
        return reply.send({
            success: false,
            message: 'unit_not_found',
        });
    }

    return reply.send({
        success: true,
        data: unit,
    });
};

module.exports = {
    create,
    update,
    remove,
    getAll,
    getById,
};
