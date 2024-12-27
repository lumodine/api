const Category = require('../category.model');

module.exports = async (request, reply) => {
    const { tenantId } = request.params;

    const {
        translations,
        image,
    } = request.body;

    //TODO: check translations.language

    const payload = {
        tenant: tenantId,
        translations,
        image,
    };

    const createdCategory = await (new Category(payload)).save();

    if (!createdCategory) {
        return reply.send({
            success: false,
            message: request.i18n.category_create_error,
        });
    }

    return reply.send({
        success: true,
        message: request.i18n.category_create_success,
    });
};
