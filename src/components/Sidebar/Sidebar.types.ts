export interface SidebarProps {
    links: { title: string; href: string; image: string }[];
    onClick?: () => void;
}