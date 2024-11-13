const Category = require('./category.model');

const create = async (request, reply) => {
    const { tenantId } = request.params;

    const {
        translations,
        image,
    } = request.body;

    //TODO: check translations.languageId

    const payload = {
        tenantId,
        translations,
        image,
    };

    const createdCategory = await (new Category(payload)).save();

    if (!createdCategory) {
        return reply.send({
            success: false,
            message: 'category_create_error',
        });
    }

    return reply.send({
        success: true,
        message: 'category_create_success',
    });
};

const update = async (request, reply) => {
    const {
        tenantId,
        categoryId,
    } = request.params;

    const {
        translations,
        image,
    } = request.body;

    const category = await Category
        .findById(categoryId);

    if (!category) {
        return reply.send({
            success: false,
            message: 'category_not_found',
        });
    }

    //TODO: check translations.languageId

    const payload = {
        tenantId,
        translations,
        image,
    };

    const updatedCategory = await Category.findByIdAndUpdate(
        categoryId,
        payload,
        {
            new: true,
        }
    );

    if (!updatedCategory) {
        return reply.send({
            success: false,
            message: 'category_update_error',
        });
    }

    return reply.send({
        success: true,
        data: updatedCategory,
    });
};

const remove = async (request, reply) => {
    const {
        tenantId,
        categoryId,
    } = request.params;

    const category = await Category
        .findOne({
            tenantId,
            _id: categoryId,
        });

    if (!category) {
        return reply.send({
            success: false,
            message: 'category_not_found',
        });
    }

    const isRemoved = await Category.findByIdAndDelete(category._id);
    if (!isRemoved) {
        return reply.send({
            success: false,
            message: 'category_remove_error',
        });
    }

    return reply.send({
        success: true,
        message: 'category_remove_success',
    });
};

const getAll = async (request, reply) => {
    const { tenantId } = request.params;
    const categories = await Category
        .find({
            tenantId,
        }).sort({
            sort: 1
        });

    if (categories.length === 0) {
        return reply.send({
            success: false,
            message: 'categories_not_found',
        });
    }

    return reply.send({
        success: true,
        data: categories,
    });
};

const getById = async (request, reply) => {
    const {
        tenantId,
        categoryId
    } = request.params;

    const category = await Category
        .findOne({
            tenantId,
            _id: categoryId,
        });

    if (!category) {
        return reply.send({
            success: false,
            message: 'category_not_found',
        });
    }

    return reply.send({
        success: true,
        data: category,
    });
};

const updateSort = async (request, reply) => {
    const { items } = request.body;

    //TODO: check items.categoryId

    const bulkOperations = items.map(item => ({
        updateOne: {
            filter: {
                _id: item.categoryId,
            },
            update: {
                $set: {
                    sort: item.sort,
                },
            },
        },
    }));

    const result = await Category.bulkWrite(bulkOperations);

    if (!result) {
        return reply.send({
            success: false,
            message: 'category_sort_error',
        });
    }

    return reply.send({
        success: true,
        message: 'category_sort_success',
    });
};

module.exports = {
    create,
    update,
    remove,
    getAll,
    getById,
    updateSort,
};
