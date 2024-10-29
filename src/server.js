const fastifyOptions = {
  logger: (process.env.NODE_ENV === 'development'),
  ignoreTrailingSlash: true,
  ignoreDuplicateSlashes: true,
  trustProxy: true,
};

const fastify = require('fastify')(fastifyOptions);
const cors = require('@fastify/cors');
const routes = require('./routes');
const mongodb = require('./databases/mongo.database');

fastify.register(cors);

routes.registerAllRoutes(fastify);

const port = process.env.PORT || 3000;
fastify.listen({ port, host: '0.0.0.0' }, async (err, address) => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }

  await mongodb.connect(process.env.MONGODB_URL);

  console.log(`Server listening on ${address}`);
});
