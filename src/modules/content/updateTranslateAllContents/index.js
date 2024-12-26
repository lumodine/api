const Category = require('../../category/category.model');
const Product = require('../../product/product.model');
const ProductVariant = require('../../productVariant/productVariant.model');
const Tag = require('../../tag/tag.model');
const Announcement = require('../../announcement/announcement.model');
const TenantBranch = require('../../tenantBranch/tenantBranch.model');

module.exports = async (request, reply) => {
    const {
        type,
        items,
    } = request.body;

    let Item;
    switch (type) {
        case 'categories':
            Item = Category;
            break;
        case 'products':
            Item = Product;
            break;
        case 'productVariants':
            Item = ProductVariant;
            break;
        case 'tags':
            Item = Tag;
            break;
        case 'announcements':
            Item = Announcement;
            break;
        case 'tenantBranches':
            Item = TenantBranch;
            break;
        default:
            return reply.send({
                success: false,
                message: request.i18n.content_invalid_type,
            });
    }

    const bulkOperations = [];
    for (const item of items) {
        // TODO: check language not exist and add new language
        bulkOperations.push({
            updateOne: {
                filter: {
                    _id: item.item,
                    "translations.language": item.language,
                },
                update: {
                    $set: {
                        "translations.$.title": item.title,
                        "translations.$.description": item.description,
                    },
                },
            },
        });
    }

    const result = await Item.bulkWrite(bulkOperations);

    if (!result) {
        return reply.send({
            success: false,
            message: request.i18n.content_update_all_translations_error,
        });
    }

    return reply.send({
        success: true,
        message: request.i18n.content_update_all_translations_success,
    });
};
