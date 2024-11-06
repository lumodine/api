const authService = require('./auth.service');

const me = async (request, reply) => {
    const data = await authService.getProfile(request.user.sub);

    return reply.send(data);
};

const mePermissions = async (request, reply) => {
    const data = await authService.getProfilePermissions(request.user.sub);

    return reply.send(data);
};

const login = async (request, reply) => {
    const {
        email,
        password,
    } = request.body;

    const data = await authService.login(email, password);

    if (!data.success) {
        return reply.send(data);
    }

    // TODO: move to service
    const token = request.server.jwt.sign(data.data);

    return reply.send({
        success: true,
        data: {
            token,
        },
    });
};

const register = async (request, reply) => {
    const {
        email,
        name,
        surname,
        password,
    } = request.body;

    const data = await authService.register(
        email,
        name,
        surname,
        password
    );

    if (!data.success) {
        return reply.send(data);
    }

    // TODO: move to service
    const token = request.server.jwt.sign(data.data);

    return reply.send({
        success: true,
        data: {
            token,
        },
    });
};

module.exports = {
    me,
    mePermissions,
    login,
    register,
};
