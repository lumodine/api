const Category = require('./category.model');
const Product = require('../product/product.model');

const create = async (tenant, products, translations, image) => {
    // TODO: check tenant
    // TODO: check products
    // TODO: check translations
    const payload = {
        tenant,
        products,
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

    if (products && products.length > 0) {
        await Product.updateMany(
            {
                _id: {
                    $in: products,
                },
            },
            {
                $addToSet: {
                    categories: category._id,
                },
            }
        );
    }

    return {
        success: true,
        message: 'category_create_success',
        data: category,
    };
};

const update = async (id, tenant, products, translations, image) => {
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

    if (category.products && category.products.length > 0) {
        await Product.updateMany(
            {
                _id: {
                    $in: category.products,
                },
            },
            {
                $pull: {
                    categories: category._id,
                },
            }
        );
    }

    if (products && products.length > 0) {
        await Product.updateMany(
            {
                _id: {
                    $in: products,
                },
            },
            {
                $addToSet: {
                    categories: category._id,
                },
            }
        );
    }

    // TODO: check tenant
    // TODO: check products
    // TODO: check translations
    const payload = {
        tenant,
        products,
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

    if (category.products && category.products.length > 0) {
        await Product.updateMany(
            {
                _id: {
                    $in: category.products,
                },
            },
            {
                $pull: {
                    categories: category._id,
                },
            }
        );
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
