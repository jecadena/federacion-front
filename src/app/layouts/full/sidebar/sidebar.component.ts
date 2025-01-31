import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrandingComponent } from './branding.component';
import { TablerIconsModule } from 'angular-tabler-icons';
import { MaterialModule } from 'src/app/material.module';
import { NavService } from 'src/app/services/nav.service';
import { NavItem } from './nav-item/nav-item';
import { RouterModule } from '@angular/router';
import { baseNavItems } from './sidebar-data'; // Importa la configuración base
import { MenuUpdateService } from 'src/app/services/menu-update.service';
import { ChangeDetectorRef } from '@angular/core';
import { UserDataService } from 'src/app/services/user-data.service'; // Importar el servicio

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    CommonModule,
    BrandingComponent,
    TablerIconsModule,
    MaterialModule,
    RouterModule,
  ],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  bannerImage: string = '';
  @Input() showToggle = true;
  @Output() toggleMobileNav = new EventEmitter<void>();
  @Output() toggleCollapsed = new EventEmitter<void>();

  navItems: NavItem[] = [];
  loading = true;
  errorMessage = '';
  userRole: string | null = '';
  userId: string | null = '';

  constructor(
    private navService: NavService,
    private sidebarDataService: MenuUpdateService,
    private cdr: ChangeDetectorRef,
    private userDataService: UserDataService // Inyectar el servicio
  ) {}

  ngOnInit(): void {
    this.loadUserData();  // Cargar los datos del usuario
  }

  private loadUserData(): void {
    const userData = this.userDataService.getStoredUserData();
    if (userData) {
      this.userRole = userData.role;
      this.userId = userData.data.id;
      console.log('User Role:', this.userRole);
      console.log('User ID:', this.userId);
  
      if (this.userRole !== 'USER') {
        // Si el rol no es 'USER', no se carga el menú y mostramos la imagen
        this.loading = false;
        this.bannerImage = 'assets/images/banner.png';  // Ruta de la imagen
      } else {
        // Si es 'USER', cargamos el menú
        this.loadMenu();
      }
    } else {
      this.errorMessage = 'No se encontró información del usuario.';
      this.loading = false;
    }
  }
  

  private loadMenu(): void {
    this.navItems = [...baseNavItems];
    
    // Usa el `userId` dinámicamente
    const federationId = this.userId || '13'; // Obtén el ID del usuario de los datos

    this.navService.getHotelsByFederation(federationId).subscribe({
      next: (hotels) => {
        const hotelsItem = this.navItems.find(
          (item) => item.displayName === 'Hotels'
        );
  
        if (hotelsItem) {
          // Crear submenú dinámico basado en los hoteles
          hotelsItem.children = hotels.map((hotel) => ({
            displayName: hotel.nombre_hotel,
            route: `/ui-components/forms/${federationId}/${hotel.id}`, // Genera la ruta dinámica
          }));
        }
  
        // Actualiza el servicio compartido con los ítems del menú
        this.sidebarDataService.updateNavItems(this.navItems);
  
        // Fuerza la detección de cambios
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Error al cargar los hoteles:', error);
        this.errorMessage =
          'No se pudo cargar los hoteles. Intente nuevamente más tarde.';
        this.loading = false;
  
        // Fuerza la detección de cambios
        this.cdr.detectChanges();
      },
    });
  }

  // Método adicional para depuración
  private debugUserData(): void {
    console.log("User Data:", {
      id: this.userId,
      role: this.userRole
    });
  }
}
