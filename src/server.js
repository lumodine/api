const fastifyOptions = {
  logger: (process.env.NODE_ENV === 'development'),
  ignoreTrailingSlash: true,
  ignoreDuplicateSlashes: true,
  trustProxy: true,
};

const fastify = require('fastify')(fastifyOptions);
const cors = require('@fastify/cors');
const { connect: mongodbConnect } = require('@lumodine/mongodb');

fastify.register(cors);

fastify.register(require('./modules/user'));
fastify.register(require('./modules/language'));
fastify.register(require('./modules/currency'));
fastify.register(require('./modules/tenant'));
fastify.register(require('./modules/unit'));
fastify.register(require('./modules/category'));
fastify.register(require('./modules/product'));

const port = process.env.PORT || 3000;
fastify.listen({ port, host: '0.0.0.0' }, async (err, address) => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }

  await mongodbConnect(process.env.MONGODB_URL);

  console.log(`Server listening on ${address}`);
});
