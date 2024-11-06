const Category = require('./category.model');

const create = async (tenant, translations, image) => {
    // TODO: check tenant
    // TODO: check translations
    const payload = {
        tenant,
        translations,
        image,
    };

    const category = await (new Category(payload)).save();

    if (!category) {
        return {
            success: false,
            message: 'category_create_error'
        };
    }

    return {
        success: true,
        message: 'category_create_success',
        data: category,
    };
};

const update = async (id, tenant, translations, image) => {
    const hasCategory = await Category
        .findOne(
            {
                _id: id,
            }
        );

    if (!hasCategory) {
        return {
            success: false,
            message: 'category_not_found'
        };
    }

    // TODO: check tenant
    // TODO: check translations
    const payload = {
        tenant,
        translations,
        image,
    };

    const newCategory = await Category
        .findByIdAndUpdate(
            id,
            payload,
            {
                new: true,
            }
        );

    if (!newCategory) {
        return {
            success: false,
            message: 'category_update_error'
        };
    }

    return {
        success: true,
        message: 'category_update_success',
        data: newCategory,
    };
};

const remove = async (id) => {
    const hasCategory = await Category
        .findOne(
            {
                _id: id,
            }
        );

    if (!hasCategory) {
        return {
            success: false,
            message: 'category_not_found'
        };
    }

    const isRemoved = await Category
        .findByIdAndDelete(id);

    if (!isRemoved) {
        return {
            success: false,
            message: 'category_remove_error'
        };
    }

    return {
        success: true,
        message: 'category_remove_success',
    };
};

const getAll = async () => {
    const items = await Category
        .find({});

    if (items.length == 0) {
        return {
            success: false,
            message: 'categories_not_found',
        };
    }

    return {
        success: true,
        data: items,
    };
};

const getById = async (id) => {
    const category = await Category
        .findOne(
            {
                _id: id,
            }
        );

    if (!category) {
        return {
            success: false,
            message: 'category_not_found'
        };
    }

    return {
        success: true,
        data: category,
    };
};

module.exports = {
    create,
    update,
    remove,
    getAll,
    getById,
};
