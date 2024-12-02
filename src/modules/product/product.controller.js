const Product = require('./product.model');
const { s3 } = require('@lumodine/aws');
const crypto = require('@lumodine/crypto');

const create = async (request, reply) => {
    const {
        tenantId,
        categoryId,
    } = request.params;

    const {
        translations,
        image,
        prices,
    } = request.body;

    //TODO: check translations.language
    //TODO: check category
    //TODO: check prices.currency

    const payload = {
        tenant: tenantId,
        translations,
        image,
        category: categoryId,
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
        categoryId,
        productId,
    } = request.params;

    const {
        translations,
        image,
        category,
        prices,
    } = request.body;

    const product = await Product
        .findOne({
            tenant: tenantId,
            category: categoryId,
            _id: productId,
        });

    if (!product) {
        return reply.send({
            success: false,
            message: 'product_not_found',
        });
    }

    //TODO: check translations.language
    //TODO: check category
    //TODO: check prices.currency

    const payload = {
        tenant: tenantId,
        translations,
        image,
        category,
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
        message: 'product_update_success',
        data: updatedProduct,
    });
};

const remove = async (request, reply) => {
    const {
        tenantId,
        categoryId,
        productId,
    } = request.params;

    const product = await Product
        .findOne({
            tenant: tenantId,
            category: categoryId,
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
    const {
        tenantId,
        categoryId,
    } = request.params;
    const products = await Product
        .find({
            tenant: tenantId,
            category: categoryId,
        }).sort({
            sort: 1
        })
        .populate('translations.language')
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

const getById = async (request, reply) => {
    const {
        tenantId,
        categoryId,
        productId,
    } = request.params;

    const product = await Product
        .findOne({
            tenant: tenantId,
            category: categoryId,
            _id: productId,
        })
        .populate('translations.language')
        .populate('prices.currency');

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
            tenant: tenantId,
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

const updateType = async (request, reply) => {
    const {
        tenantId,
        productId
    } = request.params;
    const { type } = request.body;

    const product = await Product
        .findOne({
            tenant: tenantId,
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
            type,
        },
        {
            new: true,
        }
    );

    if (!updatedProduct) {
        return reply.send({
            success: false,
            message: 'product_type_error',
        });
    }

    return reply.send({
        success: true,
        message: 'product_type_success',
    });
};

const uploadImage = async (request, reply) => {
    const {
        tenantId,
        productId
    } = request.params;

    const data = await request.file();
    const ext = data.filename.split('.').at(-1);
    const dataBody = await data.toBuffer();

    const { url } = await s3.uploadFile(
        dataBody,
        data.mimetype,
        `${tenantId}/p/${crypto.random(32)}.${ext}`
    );

    const updatedProduct = await Product.findByIdAndUpdate(
        productId,
        {
            image: url,
        },
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
        message: 'product_update_success',
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
    uploadImage,
};
