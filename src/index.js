require('dotenv')
    .config();

const requiredEnvs = [
    'NODE_ENV',
    'MONGODB_URL',
    'PORT',
];

for (const requiredEnv of requiredEnvs) {
    const env = process.env[requiredEnv];

    if (!env) {
        throw new Error(`${requiredEnv} env is required.`);
    }
}

require('./server');
