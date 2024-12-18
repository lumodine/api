const COLORS = {
    ZINC: 'zinc',
    RED: 'red',
    ROSE: 'rose',
    ORANGE: 'orange',
    GREEN: 'green',
    BLUE: 'blue',
    YELLOW: 'yellow',
    VIOLET: 'violet',
};

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

const HEADER_POSITIONS = {
    TOP: 'top',
    BOTTOM: 'bottom',
};

module.exports = {
    COLORS,
    DISALLOWED_ALIASES,
    SOCIAL_MEDIAS,
    TENANT_STATUS,
    HEADER_POSITIONS,
};
