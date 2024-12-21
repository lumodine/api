const Category = require('../category.model');

module.exports = async (request, reply) => {
    const {
        tenantId,
        categoryId,
    } = request.params;

    const {
        translations,
        image,
    } = request.body;

    const category = await Category
        .findOne({
            tenant: tenantId,
            _id: categoryId,
        });

    if (!category) {
        return reply.send({
            success: false,
            message: request.i18n.category_not_found,
        });
    }

    //TODO: check translations.language

    const payload = {
        tenant: tenantId,
        translations,
        image,
    };

    const updatedCategory = await Category.findByIdAndUpdate(
        categoryId,
        payload,
        {
            new: true,
        }
    );

    if (!updatedCategory) {
        return reply.send({
            success: false,
            message: request.i18n.category_update_error,
        });
    }

    return reply.send({
        success: true,
        data: updatedCategory,
        message: request.i18n.category_update_success,
    });
};
