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
            message: request.i18n.category_remove_image_error,
        });
    }

    return reply.send({
        success: true,
        message: request.i18n.category_remove_image_success,
    });
};
