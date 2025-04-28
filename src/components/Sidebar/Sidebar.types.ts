export interface SidebarLink {
    title: string;
    href: string;
    image: string;
    onClick?: () => void;
}

export interface SidebarProps {
    links: SidebarLink[];
}