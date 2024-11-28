require('dotenv')
    .config();

const requiredEnvs = [
    'NODE_ENV',
    'PORT',
    'MONGODB_URL',
    'BCRYPT_SALT_ROUNDS',
    'JWT_SECRET_KEY',
    'LANDING_URL',
    'DASHBOARD_URL',
    'API_URL',
    'QR_MENU_URL',
    'QR_URL',
    'CDN_URL',
    'EMAIL_HOST',
    'EMAIL_PORT',
    'EMAIL_SECURE',
    'EMAIL_USER_NAME',
    'EMAIL_USER_EMAIL',
    'EMAIL_PASSWORD',
    'AWS_ACCESS_KEY',
    'AWS_SECRET_ACCESS_KEY',
    'AWS_S3_BUCKET',
    'AWS_S3_REGION',
    'DISALLOWED_TENANT_ALIASES',
];

const requiredEnvErrors = [];
for (const requiredEnv of requiredEnvs) {
    const env = process.env[requiredEnv];

    if (!env) {
        requiredEnvErrors.push(`'${requiredEnv}' env is required.`);
    }
}

if (requiredEnvErrors.length > 0) {
    throw Error(requiredEnvErrors.join('\n'));
}

require('./server');
