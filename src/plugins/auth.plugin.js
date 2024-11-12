const fp = require('fastify-plugin');
const { USER_PERMISSIONS } = require('../modules/user/user.constant');
const User = require('../modules/user/user.model');

async function authPlugin(fastify, options) {
  fastify.register(require('@fastify/jwt'), {
    secret: process.env.JWT_SECRET_KEY
  });

  fastify.decorate('authenticate', async (request, reply) => {
    try {
      await request.jwtVerify();
    } catch (err) {
      return reply.code(401).send({
        success: false,
        message: 'unauthorized'
      });
    }
  });

  fastify.decorate('authorize', (requiredPermission) => async (request, reply) => {
    const userId = request.user.sub;

    const user = await User.findById(userId);

    if (!user) {
      return reply.code(403).send({
        success: false,
        message: 'forbidden'
      });
    }

    //TODO: check tenant role
    const userRole = user.role;

    const hasPermission = USER_PERMISSIONS[userRole].includes(requiredPermission);

    if (!hasPermission) {
      return reply.code(403).send({
        success: false,
        message: 'forbidden'
      });
    }
  });
}

module.exports = fp(authPlugin);
