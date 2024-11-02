module.exports = {
    fields: {
        isDeleted: {
            type: Boolean,
            default: false,
            select: false,
        },
        deletedAt: {
            type: Date,
            select: false,
        },
    },
    options: {
        timestamps: true,
        versionKey: false,
    },
};
