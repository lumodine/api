const Tag = require('../tag.model');
const Product = require('../../product/product.model');

module.exports = async (request, reply) => {
    const {
        tenantId,
        tagId,
    } = request.params;

    const tag = await Tag
        .findOne({
            tenant: tenantId,
            _id: tagId,
        });

    if (!tag) {
        return reply.send({
            success: false,
            message: 'tag_not_found',
        });
    }

    const [
        isRemovedTag,
        isRemovedProduct,
    ] = await Promise.all([
        await Tag.findByIdAndDelete(tagId),
        Product.updateMany(
            {
                'parentItems.item': {
                    $in: tagId,
                },
            },
            {
                $pull: {
                    parentItems: {
                        item: tagId,
                    },
                },
            }
        ),
    ]);

    if (!isRemovedTag) {
        return reply.send({
            success: false,
            message: 'tag_remove_error',
        });
    }

    return reply.send({
        success: true,
        message: 'tag_remove_success',
    });
};
