const Tenant = require('../tenant.model');
const Category = require('../../category/category.model');
const Product = require('../../product/product.model');
const Announcement = require('../../announcement/announcement.model');
const { s3 } = require('@lumodine/aws');

module.exports = async (request, reply) => {
    const tenantId = request.tenant._id;

    const [
        isRemovedTenant,
        isRemovedCategory,
        isRemovedProduct,
        isRemovedTag,
        isRemovedAnnouncement,
        isRemovedS3Folder,
    ] = await Promise.all([
        Tenant.findByIdAndDelete(tenantId),
        Category.deleteMany({
            tenant: tenantId,
        }),
        Product.deleteMany({
            tenant: tenantId,
        }),
        Tag.deleteMany({
            tenant: tenantId,
        }),
        Announcement.deleteMany({
            tenant: tenantId,
        }),
        s3.removeFolder(`${tenantId}/`),
    ]);

    if (!isRemovedTenant) {
        return reply.send({
            success: false,
            message: 'tenant_remove_error',
        });
    }

    return reply.send({
        success: true,
        message: 'tenant_remove_success',
    });
};
