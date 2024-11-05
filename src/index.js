require('dotenv')
    .config();

const requiredEnvs = [
    'NODE_ENV',
    'MONGODB_URL',
    'PORT',
    'CRYPTO_SALT_ROUNDS',
    'JWT_SECRET_KEY',
];

for (const requiredEnv of requiredEnvs) {
    const env = process.env[requiredEnv];

    if (!env) {
        throw new Error(`${requiredEnv} env is required.`);
    }
}

require('./server');
