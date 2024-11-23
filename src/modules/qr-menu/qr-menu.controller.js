const Tenant = require('../tenant/tenant.model');
const Category = require('../category/category.model');
const Product = require('../product/product.model');

const getDetail = async (request, reply) => {
    const tenantId = request.tenant._id;

    const tenant = await Tenant
        .findOne({
            _id: tenantId,
        }, '-qrCodes -users')
        .populate('languages.language')
        .populate('currencies.currency');

    return reply.send({
        success: true,
        data: tenant,
    });
};

const getCategories = async (request, reply) => {
    const tenantId = request.tenant._id;

    const categories = await Category
        .find({
            tenant: tenantId,
        })
        .populate('translations.language');

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

const getCategoryById = async (request, reply) => {
    const tenantId = request.tenant._id;
    const { categoryId } = request.params;

    const category = await Category
        .findOne({
            _id: categoryId,
            tenant: tenantId,
        })
        .populate('translations.language');

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

const getProducts = async (request, reply) => {
    const tenantId = request.tenant._id;
    const { categoryId } = request.params;

    const products = await Product
        .find({
            tenant: tenantId,
            category: categoryId,
        })
        .populate('translations.language')
        .populate('category')
        .populate('category.translations.language') //TODO
        .populate('prices.currency');

    if (products.length === 0) {
        return reply.send({
            success: false,
            message: 'products_not_found',
        });
    }

    return reply.send({
        success: true,
        data: products,
    });
};

module.exports = {
    getDetail,
    getCategories,
    getCategoryById,
    getProducts,
};
