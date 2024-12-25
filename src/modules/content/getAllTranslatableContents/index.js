const Category = require('../../category/category.model');
const Product = require('../../product/product.model');
const Tag = require('../../tag/tag.model');
const Announcement = require('../../announcement/announcement.model');
const TenantBranch = require('../../tenantBranch/tenantBranch.model');

module.exports = async (request, reply) => {
    const { tenantId } = request.params;

    const [
        categories,
        products,
        tags,
        announcements,
        tenantBranches
    ] = await Promise.all([
        Category.find({
            tenant: tenantId
        }).populate([
            'translations.language',
        ]),
        Product.find({
            tenant: tenantId
        }).populate([
            'translations.language',
        ]),
        Tag.find({
            tenant: tenantId
        }).populate([
            'translations.language',
        ]),
        Announcement.find({
            tenant: tenantId
        }).populate([
            'translations.language',
        ]),
        TenantBranch.find({
            tenant: tenantId
        }).populate([
            'translations.language',
        ]),
    ]);

    return reply.send({
        success: true,
        data: {
            categories,
            products,
            tags,
            announcements,
            tenantBranches,
        },
    });
};
