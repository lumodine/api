const Tenant = require('../tenant/tenant.model');
const Category = require('../category/category.model');
const Product = require('../product/product.model');

const getDetail = async (request, reply) => {
    const tenantId = request.tenant._id;

    const tenant = await Tenant
        .findOne({
            _id: tenantId,
        }, '-qrCodes -users')
        .populate('languages._id')
        .populate('currencies._id');

    return reply.send({
        success: true,
        data: tenant,
    });
};

const getCategories = async (request, reply) => {
    const tenantId = request.tenant._id;

    const categories = await Category
        .find({
            tenantId,
        })
        .populate('translations.languageId');

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
            tenantId,
        })
        .populate('translations.languageId');

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
            tenantId,
            categories: {
                $in: categoryId,
            },
        })
        .populate('translations.languageId')
        .populate('categories')
        .populate('categories.translations.languageId') //TODO
        .populate('prices.currencyId')
        .populate('prices.unitId')
        .populate('prices.unitId.translations.languageId'); //TODO

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
