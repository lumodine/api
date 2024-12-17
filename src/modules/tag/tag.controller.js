const Tag = require('./tag.model');

const create = async (request, reply) => {
    const { tenantId } = request.params;

    const {
        translations,
    } = request.body;

    //TODO: check translations.language

    const payload = {
        tenant: tenantId,
        translations,
    };

    const createdTag = await (new Tag(payload)).save();

    if (!createdTag) {
        return reply.send({
            success: false,
            message: 'tag_create_error',
        });
    }

    return reply.send({
        success: true,
        message: 'tag_create_success',
    });
};

const update = async (request, reply) => {
    const {
        tenantId,
        tagId,
    } = request.params;

    const {
        translations,
    } = request.body;

    const tag = await Tag
        .findOne({
            tenant: tenantId,
            _id: tagId,
        });

    if (!tag) {
        return reply.send({
            success: false,
            message: 'tag_not_found',
        });
    }

    //TODO: check translations.language

    const payload = {
        tenant: tenantId,
        translations,
    };

    const updatedTag = await Tag.findByIdAndUpdate(
        tagId,
        payload,
        {
            new: true,
        }
    );

    if (!updatedTag) {
        return reply.send({
            success: false,
            message: 'tag_update_error',
        });
    }

    return reply.send({
        success: true,
        data: updatedTag,
        message: 'tag_update_success',
    });
};

const remove = async (request, reply) => {
    const {
        tenantId,
        tagId,
    } = request.params;

    const tag = await Tag
        .findOne({
            tenant: tenantId,
            _id: tagId,
        });

    if (!tag) {
        return reply.send({
            success: false,
            message: 'tag_not_found',
        });
    }

    const isRemovedTag = await Tag.findByIdAndDelete(tagId);

    if (!isRemovedTag) {
        return reply.send({
            success: false,
            message: 'tag_remove_error',
        });
    }

    return reply.send({
        success: true,
        message: 'tag_remove_success',
    });
};

const getAll = async (request, reply) => {
    const { tenantId } = request.params;
    const tags = await Tag
        .find({
            tenant: tenantId,
        })
        .sort({
            sort: 1,
        })
        .populate('translations.language');

    if (tags.length === 0) {
        return reply.send({
            success: false,
            message: 'tags_not_found',
        });
    }

    return reply.send({
        success: true,
        data: tags,
    });
};

const getById = async (request, reply) => {
    const {
        tenantId,
        tagId
    } = request.params;

    const tag = await Tag
        .findOne({
            tenant: tenantId,
            _id: tagId,
        })
        .populate('translations.language');

    if (!tag) {
        return reply.send({
            success: false,
            message: 'tag_not_found',
        });
    }

    return reply.send({
        success: true,
        data: tag,
    });
};

module.exports = {
    create,
    update,
    remove,
    getAll,
    getById,
};
