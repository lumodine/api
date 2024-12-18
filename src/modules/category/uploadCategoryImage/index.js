const Category = require('../category.model');
const { s3 } = require('@lumodine/aws');
const crypto = require('@lumodine/crypto');

module.exports = async (request, reply) => {
    const {
        tenantId,
        categoryId
    } = request.params;

    const data = await request.file();
    const ext = data.filename.split('.').at(-1);
    const dataBody = await data.toBuffer();

    const url = await s3.uploadFile(
        dataBody,
        data.mimetype,
        `${tenantId}/c/${crypto.random(32)}.${ext}`
    );

    const updatedCategory = await Category.findByIdAndUpdate(
        categoryId,
        {
            image: url,
        },
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
        message: 'category_update_success',
    });
};
