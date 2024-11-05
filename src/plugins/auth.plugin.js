const httpStatus = require('http-status').default;
const fp = require('fastify-plugin');
const { USER_PERMISSIONS } = require('../modules/common/user.constant');
const userRepository = require('../modules/user/user.repository');

async function authPlugin(fastify, options) {
  fastify.register(require('@fastify/jwt'), {
    secret: process.env.JWT_SECRET_KEY
  });

  fastify.decorate('authenticate', async (request, reply) => {
    try {
      await request.jwtVerify();
    } catch (err) {
      return reply.code(httpStatus.UNAUTHORIZED).send({
        success: false,
        message: 'unauthorized'
      });
    }
  });

  fastify.decorate('authorize', (requiredPermission) => async (request, reply) => {
    const user = await userRepository.getById(request.user.sub);

    if (!user) {
      return reply.code(httpStatus.FORBIDDEN).send({
        success: false,
        message: 'forbidden'
      });
    }

    const userRole = user.role;

    const hasPermission = USER_PERMISSIONS[userRole].includes(requiredPermission);

    if (!hasPermission) {
      return reply.code(httpStatus.FORBIDDEN).send({
        success: false,
        message: 'forbidden'
      });
    }
  });
}

module.exports = fp(authPlugin);
