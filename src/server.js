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
fastify.register(require('./plugins/auth.plugin'));
fastify.register(require('./plugins/tenant.plugin'));

fastify.register(require('./modules/auth'));
fastify.register(require('./modules/language'));
fastify.register(require('./modules/currency'));
fastify.register(require('./modules/tenant'));
fastify.register(require('./modules/unit'));
fastify.register(require('./modules/user'));
fastify.register(require('./modules/qr-menu'));

const port = process.env.PORT || 3000;
fastify.listen({ port, host: '0.0.0.0' }, async (err, address) => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }

  await mongodbConnect(process.env.MONGODB_URL);

  console.log(`Server listening on ${address}`);
});
