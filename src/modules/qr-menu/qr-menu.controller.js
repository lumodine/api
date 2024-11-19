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

    return reply.send({
        success: true,
        data: categories,
    });
};

const getProducts = async (request, reply) => {
    const tenantId = request.tenant._id;

    const products = await Product
        .find({
            tenantId,
        })
        .populate('translations.languageId')
        .populate('categories')
        .populate('categories.translations.languageId')
        .populate('prices.currencyId')
        .populate('prices.unitId');

    return reply.send({
        success: true,
        data: products,
    });
};

module.exports = {
    getDetail,
    getCategories,
    getProducts,
};
