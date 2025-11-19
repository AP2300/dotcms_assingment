// Navigation related types
export interface NavItem {
  folder: string;
  href: string;
  target?: string;
  title: string;
}

export interface NavbarProps {
  navItems: NavItem[];
}

export interface FooterProps {
  navItems?: NavItem[];
}
