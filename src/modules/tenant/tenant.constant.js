const MENUS = (id) => [
    {
        title: "content",
        items: [
            {
                title: "units",
                href: `/d/${id}/units`,
            },
            {
                title: "menu",
                href: `/d/${id}/menu`,
            },
            {
                title: "announcements",
                href: `/d/${id}/announcements`,
            },
            {
                title: "product_tags",
                href: `/d/${id}/product-tags`,
            },
            {
                title: "favourites",
                href: `/d/${id}/favourites`,
            },
        ],
    },
    {
        title: "design",
        items: [
            {
                title: "page_design_and_color_palette",
                href: `/d/${id}/design`,
            },
        ],
    },
    {
        title: "online_orders",
        items: [
            {
                title: "order_channels",
                href: `/d/${id}/order-channels`,
            },
            {
                title: "order_settings",
                href: `/d/${id}/order-settings`,
            },
        ],
    },
    {
        title: "statistics",
        items: [
            {
                title: "views",
                href: `/d/${id}/views`,
            },
        ],
    },
    {
        title: "files",
        items: [
            {
                title: "qr_code",
                href: `/d/${id}/qr-code`,
            },
        ],
    },
    {
        title: "settings",
        items: [
            {
                title: "general_settings",
                href: `/d/${id}/general-settings`,
            },
            {
                title: "working_hours",
                href: `/d/${id}/working-hours`,
            },
            {
                title: "social_media_accounts",
                href: `/d/${id}/social-media-accounts`,
            },
            {
                title: "users",
                href: `/d/${id}/users`,
            },
            {
                title: "application_settings",
                href: `/d/${id}/application-settings`,
            },
        ],
    },
    {
        title: "other",
        items: [
            {
                title: "history",
                href: `/d/${id}/history`,
            },
        ],
    },
];

module.exports = {
    MENUS,
};
