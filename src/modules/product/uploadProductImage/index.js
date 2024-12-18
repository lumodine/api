const Product = require('../product.model');
const { s3 } = require('@lumodine/aws');
const crypto = require('@lumodine/crypto');

module.exports = async (request, reply) => {
    const {
        tenantId,
        productId
    } = request.params;

    const data = await request.file();
    const ext = data.filename.split('.').at(-1);
    const dataBody = await data.toBuffer();

    const url = await s3.uploadFile(
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
