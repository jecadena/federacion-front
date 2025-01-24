import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { NavItem } from 'src/app/layouts/full/sidebar/nav-item/nav-item';  // Asegúrate de importar el tipo correcto

@Injectable({
  providedIn: 'root'
})
export class MenuUpdateService {
  private navItemsSubject = new BehaviorSubject<NavItem[]>([]);  // Almacena los ítems del menú
  navItems$ = this.navItemsSubject.asObservable();  // Observable para que otros componentes se suscriban

  constructor() {}

  // Método para actualizar los ítems del menú
  updateNavItems(navItems: NavItem[]): void {
    // Emite una nueva referencia del arreglo, lo que asegura que Angular detecte el cambio
    this.navItemsSubject.next([...navItems]);  // Usamos spread operator para crear una nueva referencia
  }

  // Método opcional para disparar un evento de actualización sin necesidad de pasar los ítems
  triggerMenuUpdate() {
    this.navItemsSubject.next([]);  // Puedes disparar una actualización vacía si es necesario
  }
}
