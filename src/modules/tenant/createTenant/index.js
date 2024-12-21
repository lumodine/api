const Tenant = require('../tenant.model');
const { DISALLOWED_ALIASES } = require('../tenant.constant');
const qrcode = require("@lumodine/qrcode");
const { mongoose } = require('@lumodine/mongodb');
const { s3 } = require('@lumodine/aws');
const crypto = require('@lumodine/crypto');
const { USER_ROLES } = require('../../user/user.constant');

module.exports = async (request, reply) => {
    const {
        alias,
        name,
        languages,
        currencies,
    } = request.body;

    const isDisallowedAlias = DISALLOWED_ALIASES.includes(alias);

    if (isDisallowedAlias) {
        return reply.send({
            success: false,
            message: request.i18n.tenant_already_exists,
        });
    }

    const tenant = await Tenant.findOne({
        alias,
    });

    if (tenant) {
        return reply.send({
            success: false,
            message: request.i18n.tenant_already_exists,
        });
    }

    //TODO: check languages.language
    //TODO: check currencies.currency

    const id = new mongoose.Types.ObjectId();
    const { sub } = request.user;
    const qrCodeBase64 = await qrcode.createTenantById(id);
    const qrCode = await s3.uploadFileFromBase64(
        qrCodeBase64,
        'image/png',
        `${id}/q/${crypto.random(32)}.png`
    );

    const payload = {
        _id: id,
        users: [
            {
                user: sub,
                role: USER_ROLES.TENANT_ADMIN,
            },
        ],
        alias,
        name,
        languages,
        currencies,
        qrCode,
    };

    const createdTenant = await (new Tenant(payload)).save();
    if (!createdTenant) {
        return reply.send({
            success: false,
            message: request.i18n.tenant_create_error,
        });
    }

    return reply.send({
        success: true,
        message: request.i18n.tenant_create_success,
        data: createdTenant,
    });
};
