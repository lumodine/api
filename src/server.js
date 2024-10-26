const fastify = require('fastify')();

fastify.get('/', (request, reply) => {
  return reply.send({ hello: 'world' });
});

const port = process.env.PORT || 3000;
fastify.listen({ port }, (err) => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }

  console.log(`Server started at http://localhost:${port}`);
});
