const qrcode = require('qrcode');
const { SIZES } = require('./qr.constant');

const create = async (url, options = {}) => {
    return await qrcode.toDataURL(url, options);
};

const createTenantById = async (id) => {
    const url = process.env.QR_URL.replace("{id}", id);

    const defaultOptions = {
        errorCorrectionLevel: 'H',
        margin: 1,
    };

    const small = await create(url, {
        ...defaultOptions,
        ...SIZES.SMALL,
    });

    const medium = await create(url, {
        ...defaultOptions,
        ...SIZES.MEDIUM,
    });

    const large = await create(url, {
        ...defaultOptions,
        ...SIZES.LARGE,
    });

    const xlarge = await create(url, {
        ...defaultOptions,
        ...SIZES.XLARGE,
    });

    return {
        small,
        medium,
        large,
        xlarge,
    };
};

module.exports = {
    createTenantById,
};
