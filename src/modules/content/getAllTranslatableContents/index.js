const Category = require('../../category/category.model');
const Product = require('../../product/product.model');
const Tag = require('../../tag/tag.model');
const Announcement = require('../../announcement/announcement.model');
const TenantBranch = require('../../tenantBranch/tenantBranch.model');

module.exports = async (request, reply) => {
    const { tenantId } = request.params;
    const { item } = request.query;

    const baseQuery = {
        tenant: tenantId,
    };

    const query = {
        ...baseQuery,
    };

    if (item) {
        query['parentItems.item'] = {
            $in: item,
        };
    }

    const [
        categories,
        products,
        tags,
        announcements,
        tenantBranches
    ] = await Promise.all([
        Category
            .find(query)
            .populate([
                'translations.language',
            ]),
        Product
            .find(query)
            .populate([
                'translations.language',
            ]),
        Tag
            .find(query)
            .populate([
                'translations.language',
            ]),
        Announcement
            .find(baseQuery)
            .populate([
                'translations.language',
            ]),
        TenantBranch
            .find(baseQuery)
            .populate([
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
