import { NavItem } from './nav-item/nav-item';

export const baseNavItems: NavItem[] = [
  {
    displayName: 'Rooming List',
    iconName: 'solar:file-text-line-duotone',
    route: '/ui-components/forms',
  },
  {
    displayName: 'Hotels',
    iconName: 'solar:building-line-duotone',
    children: [],
  },
];