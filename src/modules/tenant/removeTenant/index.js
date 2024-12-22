const Tenant = require('../tenant.model');
const Item = require('../../item/item.model');
const Tag = require('../../tag/tag.model');
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
        Item.deleteMany({
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
            message: request.i18n.tenant_remove_error,
        });
    }

    return reply.send({
        success: true,
        message: request.i18n.tenant_remove_success,
    });
};
