const Product = require('./product.model');
const Category = require('../category/category.model');

const create = async (tenant, translations, image, categories, prices) => {
    // TODO: check tenant
    // TODO: check translations
    // TODO: check categories
    // TODO: check prices
    const payload = {
        tenant,
        translations,
        image,
        categories,
        prices,
    };

    const product = await (new Product(payload)).save();

    if (!product) {
        return {
            success: false,
            message: 'product_create_error'
        };
    }

    if (categories && categories.length > 0) {
        await Category.updateMany(
            {
                _id:{
                    $in: categories,
                },
            },
            {
                $addToSet: {
                    products: product._id,
                },
            }
        );
    }

    return {
        success: true,
        message: 'product_create_success',
        data: product,
    };
};

const update = async (id, tenant, translations, image, categories, prices) => {
    const product = await Product
        .findOne(
            {
                _id: id,
            }
        );

    if (!product) {
        return {
            success: false,
            message: 'product_not_found'
        };
    }

    if (product.categories && product.categories.length > 0) {
        await Category.updateMany(
            {
                _id: {
                    $in: product.categories,
                },
            },
            {
                $pull: {
                    products: product._id,
                },
            }
        );
    }

    if (categories && categories.length > 0) {
        await Category.updateMany(
            {
                _id: {
                    $in: categories,
                },
            },
            {
                $addToSet: {
                    products: product._id,
                },
            }
        );
    }

    // TODO: check tenant
    // TODO: check translations
    // TODO: check categories
    // TODO: check prices
    const payload = {
        tenant,
        translations,
        image,
        categories,
        prices,
    };

    const newProduct = await Product
        .findByIdAndUpdate(
            id,
            payload,
            {
                new: true,
            }
        );

    if (!newProduct) {
        return {
            success: false,
            message: 'product_update_error'
        };
    }

    return {
        success: true,
        message: 'product_update_success',
        data: newProduct,
    };
};

const remove = async (id) => {
    const product = await Product
        .findOne(
            {
                _id: id,
            }
        );

    if (!product) {
        return {
            success: false,
            message: 'product_not_found'
        };
    }

    if (product.categories && product.categories.length > 0) {
        await Category.updateMany(
            {
                _id: {
                    $in: product.categories,
                },
            },
            {
                $pull: {
                    products: product._id,
                },
            }
        );
    }

    const isRemoved = await Product
        .findByIdAndDelete(id);

    if (!isRemoved) {
        return {
            success: false,
            message: 'product_remove_error'
        };
    }

    return {
        success: true,
        message: 'product_remove_success',
    };
};

const getAll = async () => {
    const items = await Product
        .find({});

    if (items.length == 0) {
        return {
            success: false,
            message: 'products_not_found',
        };
    }

    return {
        success: true,
        data: items,
    };
};

const getById = async (id) => {
    const product = await Product
        .findOne(
            {
                _id: id,
            }
        );

    if (!product) {
        return {
            success: false,
            message: 'product_not_found'
        };
    }

    return {
        success: true,
        data: product,
    };
};

module.exports = {
    create,
    update,
    remove,
    getAll,
    getById,
};
