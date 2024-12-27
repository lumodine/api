const fastifyOptions = {
  logger: (process.env.NODE_ENV === 'development'),
  ignoreTrailingSlash: true,
  ignoreDuplicateSlashes: true,
  trustProxy: true,
};

const fastify = require('fastify')(fastifyOptions);
const cors = require('@fastify/cors');
const Ajv = require('ajv').default;
const { connect: mongodbConnect } = require('@lumodine/mongodb');

const ajv = new Ajv({
  removeAdditional: true,
  useDefaults: true,
  coerceTypes: 'array',
  allErrors: true,
});

fastify.setValidatorCompiler(({ schema, method, url, httpPart }) => {
  return ajv.compile(schema);
});

fastify.register(cors);
fastify.register(require('@fastify/multipart'));
fastify.register(require('@fastify/rate-limit'), {
  max: 500,
  timeWindow: '1 minute'
});

fastify.register(require('./features/i18n/i18n.plugin'));
fastify.register(require('./features/auth/auth.plugin'));
fastify.register(require('./features/tenant/tenant.plugin'));

fastify.register(require('./features/auth'));
fastify.register(require('./features/language'));
fastify.register(require('./features/currency'));
fastify.register(require('./features/tenant'));
fastify.register(require('./features/qrMenu'));
fastify.register(require('./features/theme'));
fastify.register(require('./features/event'));

const port = process.env.PORT || 3000;
fastify.listen({ port, host: '0.0.0.0' }, async (err, address) => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }

  await mongodbConnect(process.env.MONGODB_URL);

  console.log(`Server listening on ${address}`);
});
