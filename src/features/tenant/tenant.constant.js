const DISALLOWED_ALIASES = process.env.DISALLOWED_TENANT_ALIASES.split(',');

const SOCIAL_MEDIAS = {
    INSTAGRAM: 'instagram',
    X: 'x',
    FACEBOOK: 'facebook',
    YOUTUBE: 'youtube',
    WEBSITE: 'website',
};

const TENANT_STATUS = {
    MAINTENANCE: 'maintenance',
    PUBLISHED: 'published',
};

const TENANT_ALIAS_MIN_LENGTH = 5;

module.exports = {
    DISALLOWED_ALIASES,
    SOCIAL_MEDIAS,
    TENANT_STATUS,
    TENANT_ALIAS_MIN_LENGTH,
};
