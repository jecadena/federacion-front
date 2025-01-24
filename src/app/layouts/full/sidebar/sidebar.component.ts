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
  @Input() showToggle = true;
  @Output() toggleMobileNav = new EventEmitter<void>();
  @Output() toggleCollapsed = new EventEmitter<void>();

  navItems: NavItem[] = [];
  loading = true;
  errorMessage = '';

  constructor(
    private navService: NavService,
    private sidebarDataService: MenuUpdateService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.subscribeToMenuUpdates();
    this.loadMenu();
  }

  private subscribeToMenuUpdates(): void {
    this.sidebarDataService.navItems$.subscribe({
      next: (navItems) => {
        this.navItems = [...navItems]; // Crea una nueva referencia para forzar la detección de cambios
        this.loading = false;
      },
      error: (error) => {
        console.error('Error al recibir los ítems del menú:', error);
        this.errorMessage = 'No se pudo cargar el menú. Intente nuevamente más tarde.';
        this.loading = false;
      },
    });
  }

  private loadMenu(): void {
  this.navItems = [...baseNavItems];

  const federationId = '13';
  this.navService.getHotelsByFederation(federationId).subscribe({
    next: (hotels) => {
      const hotelsItem = this.navItems.find(
        (item) => item.displayName === 'Hotels'
      );

      if (hotelsItem) {
        hotelsItem.children = hotels.map((hotel) => ({
          displayName: hotel.nombre_hotel,
          route: `/hotels/${hotel.id}`,
        }));
      }

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

}
