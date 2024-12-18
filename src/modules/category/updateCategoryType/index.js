const Category = require('../category.model');

module.exports = async (request, reply) => {
    const {
        tenantId,
        categoryId
    } = request.params;
    const { type } = request.body;

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
            type,
        },
        {
            new: true,
        }
    );

    if (!updatedCategory) {
        return reply.send({
            success: false,
            message: 'category_type_error',
        });
    }

    return reply.send({
        success: true,
        message: 'category_type_success',
    });
};
