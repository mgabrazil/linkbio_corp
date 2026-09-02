import type { ComponentType, SVGProps } from "react";

export type IconComponent = ComponentType<SVGProps<SVGSVGElement>>;

export type NavItem = {
  title: string;
  href: string;
  external?: boolean;
  disabled?: boolean;
  icon?: IconComponent;
};
