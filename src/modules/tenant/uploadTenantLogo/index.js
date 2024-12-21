const Tenant = require('../tenant.model');
const { s3 } = require('@lumodine/aws');
const crypto = require('@lumodine/crypto');

module.exports = async (request, reply) => {
    const { tenantId } = request.params;

    const data = await request.file();
    const ext = data.filename.split('.').at(-1);
    const dataBody = await data.toBuffer();

    const url = await s3.uploadFile(
        dataBody,
        data.mimetype,
        `${tenantId}/t/${crypto.random(32)}.${ext}`
    );

    const updatedTenant = await Tenant.findByIdAndUpdate(
        tenantId,
        {
            logo: url,
        },
        {
            new: true,
        }
    );

    if (!updatedTenant) {
        return reply.send({
            success: false,
            message: request.i18n.tenant_upload_logo_error,
        });
    }

    return reply.send({
        success: true,
        message: request.i18n.tenant_upload_logo_success,
    });
};
