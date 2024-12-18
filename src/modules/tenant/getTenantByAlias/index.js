module.exports = async (request, reply) => {
    return reply.send({
        success: true,
        data: request.tenant.alias,
    });
};
