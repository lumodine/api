const fp = require('fastify-plugin');
const { USER_PERMISSIONS } = require('../user/user.constant');
const User = require('../user/user.model');

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
        message: request.i18n.auth_unauthorized
      });
    }
  });

  fastify.decorate('authorize', (requiredPermission) => async (request, reply) => {
    const { sub } = request.user;

    const user = await User.findById(sub);

    if (!user) {
      return reply.code(403).send({
        success: false,
        message: request.i18n.auth_forbidden
      });
    }

    const userRole = user.role;

    const hasPermission = USER_PERMISSIONS[userRole]?.includes(requiredPermission);

    if (!hasPermission) {
      return reply.code(403).send({
        success: false,
        message: request.i18n.auth_forbidden
      });
    }
  });
}

module.exports = fp(authPlugin);
