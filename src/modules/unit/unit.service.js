const Unit = require('./unit.model');

const create = async (tenant, translations) => {
    // TODO: check tenant
    // TODO: check translations
    const payload = {
        tenant,
        translations,
    };

    const unit = await (new Unit(payload)).save();

    if (!unit) {
        return {
            success: false,
            message: 'unit_create_error'
        };
    }

    return {
        success: true,
        message: 'unit_create_success',
        data: unit,
    };
};

const update = async (id, tenant, translations) => {
    const hasUnit = await Unit
        .findOne(
            {
                _id: id,
            }
        );

    if (!hasUnit) {
        return {
            success: false,
            message: 'unit_not_found'
        };
    }

    // TODO: check tenant
    // TODO: check translations
    const payload = {
        tenant,
        translations,
    };

    const newUnit = await Unit
        .findByIdAndUpdate(
            id,
            payload,
            {
                new: true,
            }
        );

    if (!newUnit) {
        return {
            success: false,
            message: 'unit_update_error'
        };
    }

    return {
        success: true,
        message: 'unit_update_success',
        data: newUnit,
    };
};

const remove = async (id) => {
    const hasUnit = await Unit
        .findOne(
            {
                _id: id,
            }
        );

    if (!hasUnit) {
        return {
            success: false,
            message: 'unit_not_found'
        };
    }

    const isRemoved = await Unit
        .findByIdAndDelete(id);

    if (!isRemoved) {
        return {
            success: false,
            message: 'unit_remove_error'
        };
    }

    return {
        success: true,
        message: 'unit_remove_success',
    };
};

const getAll = async () => {
    const items = await Unit
        .find({});

    if (items.length == 0) {
        return {
            success: false,
            message: 'units_not_found',
        };
    }

    return {
        success: true,
        data: items,
    };
};

const getById = async (id) => {
    const unit = await Unit
        .findOne(
            {
                _id: id,
            }
        );

    if (!unit) {
        return {
            success: false,
            message: 'unit_not_found'
        };
    }

    return {
        success: true,
        data: unit,
    };
};

module.exports = {
    create,
    update,
    remove,
    getAll,
    getById,
};
