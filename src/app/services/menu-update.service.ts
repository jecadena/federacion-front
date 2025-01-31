import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { NavItem } from 'src/app/layouts/full/sidebar/nav-item/nav-item'; // Asegúrate de importar el tipo correcto

@Injectable({
  providedIn: 'root',
})
export class MenuUpdateService {
  private navItemsSubject = new BehaviorSubject<NavItem[]>([]); // Almacena los ítems del menú
  navItems$ = this.navItemsSubject.asObservable(); // Observable para que otros componentes se suscriban

  constructor() {}

  /**
   * Obtiene los ítems actuales del menú.
   * @returns NavItem[] Lista de ítems actuales.
   */
  getNavItems(): NavItem[] {
    return this.navItemsSubject.getValue();
  }

  /**
   * Reemplaza todos los ítems del menú.
   * @param newNavItems Nueva lista de ítems de menú.
   */
  updateNavItems(newNavItems: NavItem[]): void {
    this.navItemsSubject.next(newNavItems); // Actualiza la lista completa de ítems.
  }

  /**
   * Agrega un nuevo ítem al menú.
   * @param newNavItem Nuevo ítem de menú a agregar.
   */
  addNavItem(newNavItem: NavItem, parentDisplayName: string): void {
    const currentNavItems = this.getNavItems();
  
    const parentItem = currentNavItems.find(item => item.displayName === parentDisplayName);
    if (parentItem) {
      parentItem.children = parentItem.children || [];
      parentItem.children.push(newNavItem);
    } else {
      console.warn(`Parent item with displayName "${parentDisplayName}" not found.`);
    }
  
    // Emite la actualización de los ítems del menú
    this.navItemsSubject.next([...currentNavItems]);
  }  
}
