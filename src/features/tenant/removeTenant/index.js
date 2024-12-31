const Tenant = require('../tenant.model');
const TenantBranch = require('../../tenantBranch/tenantBranch.model');
const Item = require('../../item/item.model');
const ItemRelation = require('../../itemRelation/itemRelation.model');
const Announcement = require('../../announcement/announcement.model');
const Event = require('../../event/event.model');
const { s3 } = require('@lumodine/aws');
const { mongoose } = require('@lumodine/mongodb');

module.exports = async (request, reply) => {
    const tenantId = request.tenant._id;

    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const items = await Item.find({ tenant: tenantId }, null, { session });
        const itemIds = items.map(item => item._id);

        const [
            isRemovedTenant,
            isRemovedTenantBranch,
            isRemovedItem,
            isRemovedRelations,
            isRemovedAnnouncement,
            isRemovedEvent,
            isRemovedS3Folder,
        ] = await Promise.all([
            Tenant.findByIdAndDelete(tenantId, { session }),
            TenantBranch.deleteMany({
                tenant: tenantId,
            }, { session }),
            Item.deleteMany({
                tenant: tenantId,
            }, { session }),
            ItemRelation.deleteMany({
                $or: [
                    { sourceItem: { $in: itemIds } },
                    { targetItem: { $in: itemIds } }
                ]
            }, { session }),
            Announcement.deleteMany({
                tenant: tenantId,
            }, { session }),
            Event.deleteMany({
                tenant: tenantId,
            }, { session }),
            s3.removeFolder(`${tenantId}/`),
        ]);
    
        if (!isRemovedTenant || !isRemovedTenantBranch || !isRemovedItem || !isRemovedRelations || !isRemovedAnnouncement || !isRemovedEvent || !isRemovedS3Folder) {
            await session.abortTransaction();
            session.endSession();

            return reply.send({
                success: false,
                message: request.i18n.tenant_remove_error,
            });
        }

        await session.commitTransaction();
        session.endSession();
    
        return reply.send({
            success: true,
            message: request.i18n.tenant_remove_success,
        });
    } catch (error) {
        await session.abortTransaction();
        session.endSession();

        return reply.send({
            success: false,
            message: request.i18n.tenant_remove_error,
        });
    }
};
