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
    {label: "Web Solutions", path: "/services/web-development"},
    {label: "Mobile Apps", path: "/services/mobile-development"},
    {label: "API Solutions", path: "/services/api-integration"},
    {label: "Customization", path: "/services/customization"},
    {label: "Product Engineering", path: "/services/product-development"},
    {label: "Deployment", path: "/services/deployment"},
    {label: "Consulting", path: "/services/consulting"},
    {label: "AI Agent Integration", path: "/services/ai-integration"},
];

export const developersMenu: MenuItem[] = [
    {label: "Angular Experts", path: "/hire-developers/angular"},
    {label: "React Specialists", path: "/hire-developers/react"},
    {label: "Java Professionals", path: "/hire-developers/java"},
];

export const solutionsMenu: MenuItem[] = [
    {label: "Services", path: "/our-work"},
    {label: "Development", path: "/services"},
    {label: "Products", path: "/products"},
    {label: "SiteSync", path: "/products/sitesync"},
    {label: "Praksis", path: "/products/praksis"},
];

export const topLevelTabs: TopLevelTab[] = [
    {label: "Home", path: "/"},
    {label: "Solutions", path: "/solutions", children: solutionsMenu},
    {label: "Career", path: "/career"},
    {label: "About", path: "/about"},
    {label: "Contact", path: "/contact"},
];