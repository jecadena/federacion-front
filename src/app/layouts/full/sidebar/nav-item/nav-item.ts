export interface NavItem {
  label?: string; // Ahora es opcional
  icon?: string; // Ahora es opcional
  displayName?: string;
  divider?: boolean;
  iconName?: string;
  navCap?: string;
  route?: string;
  children?: NavItem[]; // Esto es importante para los submenús
  isHeader?: boolean;
}
