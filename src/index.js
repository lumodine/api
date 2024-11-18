require('dotenv')
    .config();

const requiredEnvs = [
    'NODE_ENV',
    'MONGODB_URL',
    'PORT',
    'BCRYPT_SALT_ROUNDS',
    'JWT_SECRET_KEY',
    'EMAIL_HOST',
    'EMAIL_PORT',
    'EMAIL_SECURE',
    'EMAIL_USER_NAME',
    'EMAIL_USER_EMAIL',
    'EMAIL_PASSWORD',
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
