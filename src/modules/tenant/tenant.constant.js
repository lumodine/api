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

module.exports = {
    THEMES,
    DISALLOWED_ALIASES,
};
