const SubCategory = require('../subCategory.model');

module.exports = async (request, reply) => {
    const {
        tenantId,
        subCategoryId,
    } = request.params;

    const {
        translations,
    } = request.body;

    const subCategory = await SubCategory
        .findOne({
            tenant: tenantId,
            _id: subCategoryId,
        });

    if (!subCategory) {
        return reply.send({
            success: false,
            message: request.i18n.sub_category_not_found,
        });
    }

    //TODO: check translations.language

    const payload = {
        tenant: tenantId,
        translations,
    };

    const updatedSubCategory = await SubCategory.findByIdAndUpdate(
        subCategoryId,
        payload,
        {
            new: true,
        }
    );

    if (!updatedSubCategory) {
        return reply.send({
            success: false,
            message: request.i18n.sub_category_update_error,
        });
    }

    return reply.send({
        success: true,
        message: request.i18n.sub_category_update_success,
    });
};
