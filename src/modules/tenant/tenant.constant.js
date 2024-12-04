const THEMES = {
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

module.exports = {
    THEMES,
    DISALLOWED_ALIASES,
    SOCIAL_MEDIAS,
};
