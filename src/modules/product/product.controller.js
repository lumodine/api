const Product = require('./product.model');

const create = async (request, reply) => {
    const { tenantId } = request.params;

    const {
        translations,
        image,
        categories,
        prices,
    } = request.body;

    //TODO: check translations.languageId
    //TODO: check categories
    //TODO: check prices.currencyId
    //TODO: check prices.unitId

    const payload = {
        tenantId,
        translations,
        image,
        categories,
        prices,
    };

    const createdProduct = await (new Product(payload)).save();

    if (!createdProduct) {
        return reply.send({
            success: false,
            message: 'product_create_error',
        });
    }

    return reply.send({
        success: true,
        message: 'product_create_success',
    });
};

const update = async (request, reply) => {
    const {
        tenantId,
        productId,
    } = request.params;

    const {
        translations,
        image,
        categories,
        prices,
    } = request.body;

    const product = await Product
        .findOne({
            tenantId,
            _id: productId,
        });

    if (!product) {
        return reply.send({
            success: false,
            message: 'product_not_found',
        });
    }

    //TODO: check translations.languageId
    //TODO: check categories
    //TODO: check prices.currencyId
    //TODO: check prices.unitId

    const payload = {
        tenantId,
        translations,
        image,
        categories,
        prices,
    };

    const updatedProduct = await Product.findByIdAndUpdate(
        productId,
        payload,
        {
            new: true,
        }
    );

    if (!updatedProduct) {
        return reply.send({
            success: false,
            message: 'product_update_error',
        });
    }

    return reply.send({
        success: true,
        data: updatedProduct,
    });
};

const remove = async (request, reply) => {
    const {
        tenantId,
        productId,
    } = request.params;

    const product = await Product
        .findOne({
            tenantId,
            _id: productId,
        });

    if (!product) {
        return reply.send({
            success: false,
            message: 'product_not_found',
        });
    }

    const isRemoved = await Product.findByIdAndDelete(product._id);
    if (!isRemoved) {
        return reply.send({
            success: false,
            message: 'product_remove_error',
        });
    }

    return reply.send({
        success: true,
        message: 'product_remove_success',
    });
};

const getAll = async (request, reply) => {
    const { tenantId } = request.params;
    const products = await Product
        .find({
            tenantId,
        }).sort({
            sort: 1
        });

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

const getById = async (request, reply) => {
    const {
        tenantId,
        productId
    } = request.params;

    const product = await Product
        .findOne({
            tenantId,
            _id: productId,
        });

    if (!product) {
        return reply.send({
            success: false,
            message: 'product_not_found',
        });
    }

    return reply.send({
        success: true,
        data: product,
    });
};

const updateSort = async (request, reply) => {
    const { items } = request.body;

    //TODO: check items.productId

    const bulkOperations = items.map(item => ({
        updateOne: {
            filter: {
                _id: item.productId,
            },
            update: {
                $set: {
                    sort: item.sort,
                },
            },
        },
    }));

    const result = await Product.bulkWrite(bulkOperations);

    if (!result) {
        return reply.send({
            success: false,
            message: 'product_sort_error',
        });
    }

    return reply.send({
        success: true,
        message: 'product_sort_success',
    });
};

const updateStatus = async (request, reply) => {
    const {
        tenantId,
        productId
    } = request.params;
    const { status } = request.body;

    const product = await Product
        .findOne({
            tenantId,
            _id: productId,
        });

    if (!product) {
        return reply.send({
            success: false,
            message: 'product_not_found',
        });
    }

    const updatedProduct = await Product.findByIdAndUpdate(
        productId,
        {
            status,
        },
        {
            new: true,
        }
    );

    if (!updatedProduct) {
        return reply.send({
            success: false,
            message: 'product_status_error',
        });
    }

    return reply.send({
        success: true,
        message: 'product_status_success',
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
};
