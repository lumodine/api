const { PERMISSIONS } = require('../user/user.constant');
const createEvent = require('./createEvent');
const getAllEvents = require('./getAllEvents');
const getAllGroupedEvents = require('./getAllGroupedEvents');

module.exports = (fastify, opts, done) => {
    fastify.post(
        '/',
        createEvent
    );

    fastify.get(
        '/',
        {
            preHandler: [
                fastify.authenticate,
                fastify.authorize(PERMISSIONS.EVENT_GET_ALL),
            ],
        },
        getAllEvents
    ); 

    fastify.get(
        '/grouped',
        {
            preHandler: [
                fastify.authenticate,
                fastify.authorize(PERMISSIONS.EVENT_GET_ALL_GROUPED),
            ],
        },
        getAllGroupedEvents
    ); 

    done();
};
