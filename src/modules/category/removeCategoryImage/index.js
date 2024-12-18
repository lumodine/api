const Category = require('../category.model');

module.exports = async (request, reply) => {
    const {
        categoryId
    } = request.params;

    const updatedCategory = await Category.findByIdAndUpdate(
        categoryId,
        {
            image: null,
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
