export type MenuItem = {
    label: string;
    path: string;
};

export type TopLevelTab = {
    label: string;
    path: string;
    children?: MenuItem[];
};

export const servicesMenu: MenuItem[] = [
    {label: "Web Development", path: "/services/web-development"},
    {label: "Mobile Development", path: "/services/mobile-development"},
    {label: "API Integration", path: "/services/api-integration"},
    {label: "Customization", path: "/services/customization"},
    {label: "Product Development", path: "/services/product-development"},
    {label: "Deployment", path: "/services/deployment"},
    {label: "Consulting", path: "/services/consulting"},
    {label: "AI Agent Integration", path: "/services/ai-integration"},
];

export const developersMenu: MenuItem[] = [
    {label: "Hire Angular Developer", path: "/hire-developers/angular"},
    {label: "Hire React Developer", path: "/hire-developers/react"},
    {label: "Hire Java Developer", path: "/hire-developers/java"},
];

export const topLevelTabs: TopLevelTab[] = [
    {label: "Home", path: "/"},
    {label: "Services", path: "/services", children: servicesMenu},
    {label: "Our Work", path: "/our-work"},
    {label: "Hire Developers", path: "/hire-developers", children: developersMenu},
    {label: "Career", path: "/career"},
    {label: "About", path: "/about"},
    {label: "Contact", path: "/contact"},
];