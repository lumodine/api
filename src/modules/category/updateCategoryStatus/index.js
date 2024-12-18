const Category = require('../category.model');

module.exports = async (request, reply) => {
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
