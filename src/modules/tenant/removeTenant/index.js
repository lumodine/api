const Tenant = require('../tenant.model');
const TenantBranch = require('../../tenantBranch/tenantBranch.model');
const Item = require('../../item/item.model');
const Announcement = require('../../announcement/announcement.model');
const { s3 } = require('@lumodine/aws');

module.exports = async (request, reply) => {
    const tenantId = request.tenant._id;

    const [
        isRemovedTenant,
        isRemovedTenantBranch,
        isRemovedItem,
        isRemovedAnnouncement,
        isRemovedS3Folder,
    ] = await Promise.all([
        Tenant.findByIdAndDelete(tenantId),
        TenantBranch.deleteMany({
            tenant: tenantId,
        }),
        Item.deleteMany({
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
