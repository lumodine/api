const qrcode = require('qrcode');
const { SIZES } = require('./qr.constant');

const create = async (url, options = {}) => {
    return await qrcode.toDataURL(url, options);
};

const createTenantAlias = async (alias) => {
    const url = process.env.QR_MENU_URL.replace("{alias}", alias);

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
    createTenantAlias,
};
