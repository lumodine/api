const qrcode = require('qrcode');
const { SIZES } = require('./qr.constant');

const create = async (url, options = {}) => {
    return await qrcode.toDataURL(url, options);
};

const createTenantById = async (id) => {
    let url = process.env.QR_URL.replace("{id}", id);
    url = `${url}?event=scan-qr-code`;

    const defaultOptions = {
        errorCorrectionLevel: 'H',
        margin: 1,
    };

    const xlarge = await create(url, {
        ...defaultOptions,
        ...SIZES.XLARGE,
    });

    return xlarge;
};

module.exports = {
    createTenantById,
};
