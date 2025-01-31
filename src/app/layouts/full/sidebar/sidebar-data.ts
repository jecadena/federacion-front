import { NavItem } from './nav-item/nav-item';

/**
 * Definición base de los ítems del menú lateral.
 */
export const baseNavItems: NavItem[] = [
  {
    displayName: 'Rooming List', // Nombre que se muestra en el menú.
    iconName: 'solar:file-text-line-duotone', // Nombre del ícono (usado en la librería de íconos).
    route: '/ui-components/forms', // Ruta a la que redirige el ítem.
    children: [], // Lista de hijos, vacío si no tiene.
  },
  {
    displayName: 'Hotels', // Grupo de hoteles.
    iconName: 'solar:building-line-duotone',
    route: '', // Ruta no definida, ya que tiene hijos dinámicos.
    children: [], // Se llenará dinámicamente.
  },
];
