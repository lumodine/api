const Category = require('./category.model');
const Product = require('../product/product.model');

const create = async (request, reply) => {
    const { tenantId } = request.params;

    const {
        translations,
        image,
    } = request.body;

    //TODO: check translations.language

    const payload = {
        tenant: tenantId,
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
        .findOne({
            tenant: tenantId,
            _id: categoryId,
        });

    if (!category) {
        return reply.send({
            success: false,
            message: 'category_not_found',
        });
    }

    //TODO: check translations.language

    const payload = {
        tenant: tenantId,
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
        message: 'category_update_success',
    });
};

const remove = async (request, reply) => {
    const {
        tenantId,
        categoryId,
    } = request.params;

    const category = await Category
        .findOne({
            tenant: tenantId,
            _id: categoryId,
        });

    if (!category) {
        return reply.send({
            success: false,
            message: 'category_not_found',
        });
    }

    const [
        isRemovedCategory,
        isRemovedProduct,
    ] = await Promise.all([
        Category.findByIdAndDelete(categoryId),
        Product.deleteMany({
            category: categoryId,
        }),
    ]);

    if (!isRemovedCategory) {
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
            tenant: tenantId,
        })
        .sort({
            sort: 1,
        })
        .populate('translations.language')
        .populate('parentCategory');

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
            tenant: tenantId,
            _id: categoryId,
        })
        .populate('translations.language')
        .populate('parentCategory');

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

const updateStatus = async (request, reply) => {
    const {
        tenantId,
        categoryId
    } = request.params;
    const { status } = request.body;

    const category = await Category
        .findOne({
            tenant: tenantId,
            _id: categoryId,
        });

    if (!category) {
        return reply.send({
            success: false,
            message: 'category_not_found',
        });
    }

    const updatedCategory = await Category.findByIdAndUpdate(
        categoryId,
        {
            status,
        },
        {
            new: true,
        }
    );

    if (!updatedCategory) {
        return reply.send({
            success: false,
            message: 'category_status_error',
        });
    }

    return reply.send({
        success: true,
        message: 'category_status_success',
    });
};

const updateType = async (request, reply) => {
    const {
        tenantId,
        categoryId
    } = request.params;
    const { type } = request.body;

    const category = await Category
        .findOne({
            tenant: tenantId,
            _id: categoryId,
        });

    if (!category) {
        return reply.send({
            success: false,
            message: 'category_not_found',
        });
    }

    const updatedCategory = await Category.findByIdAndUpdate(
        categoryId,
        {
            type,
        },
        {
            new: true,
        }
    );

    if (!updatedCategory) {
        return reply.send({
            success: false,
            message: 'category_type_error',
        });
    }

    return reply.send({
        success: true,
        message: 'category_type_success',
    });
};

module.exports = {
    create,
    update,
    remove,
    getAll,
    getById,
    updateSort,
    updateStatus,
    updateType,
};
