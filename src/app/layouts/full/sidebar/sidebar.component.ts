import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrandingComponent } from './branding.component';
import { TablerIconsModule } from 'angular-tabler-icons';
import { MaterialModule } from 'src/app/material.module';
import { NavService } from 'src/app/services/nav.service';
import { NavItem } from './nav-item/nav-item';
import { RouterModule } from '@angular/router';
import { baseNavItems } from './sidebar-data';
import { MenuUpdateService } from 'src/app/services/menu-update.service';
import { ChangeDetectorRef } from '@angular/core';
import { UserDataService } from 'src/app/services/user-data.service';

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
  adminTableHtml: string = ''; 
  bannerImage: string = '';
  @Input() showToggle = true;
  @Output() toggleMobileNav = new EventEmitter<void>();
  @Output() toggleCollapsed = new EventEmitter<void>();

  navItems: NavItem[] = [];
  loading = true;
  errorMessage = '';
  userRole: string | null = '';
  userId: string | null = '';
  showAdminTable = false;

  constructor(
    private navService: NavService,
    private sidebarDataService: MenuUpdateService,
    private cdr: ChangeDetectorRef,
    private userDataService: UserDataService
  ) {}

  ngOnInit(): void {
    this.loadUserData();
  }

  private loadUserData(): void {
    const userData = this.userDataService.getStoredUserData();
    if (userData) {
      this.userRole = userData.role;
      this.userId = userData.data.id;
      console.log('User Role:', this.userRole);
      console.log('User ID Sidebar:', this.userId);
  
      if (this.userRole !== 'USER') {
        this.showAdminTable = true;
      } else {
        this.showAdminTable = false;
        this.loadMenu();
      }
    } else {
      this.errorMessage = 'No se encontró información del usuario.';
      this.loading = false;
    }
  }  

  private loadMenu(): void {
    this.navItems = [...baseNavItems];
    const federationId = this.userId || '13';
  
    this.navService.getHotelsByFederation(federationId).subscribe({
      next: (hotels) => {
        const hotelsItem = this.navItems.find((item) => item.displayName === 'Hotels');
  
        if (hotels.length > 0 && hotelsItem) {
          hotelsItem.children = hotels.map((hotel) => ({
            displayName: hotel.nombre_hotel,
            route: `/ui-components/forms/${federationId}/${hotel.id}`,
          }));
        } else {
          this.navService.confirmationHotels(federationId).subscribe({
            next: (confirmationHotels) => {
              if (hotelsItem) {
                hotelsItem.children = [
                  { displayName: 'UNCONFIRMED', isHeader: true },
                  ...confirmationHotels.map((hotel) => ({
                    displayName: hotel.nombre_hotel,
                    route: '/ui-components/forms',
                  })),
                ];
                this.showConfirmationList(confirmationHotels);
              }
            },
            error: (error) => {
              console.error('Error al cargar hoteles sin confirmar:', error);
              this.errorMessage = 'No se pudo cargar los hoteles sin confirmar.';
              this.loading = false;
              this.cdr.detectChanges();
            },
          });
        }
  
        this.sidebarDataService.updateNavItems(this.navItems);
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Error al cargar los hoteles:', error);
        this.errorMessage = 'No se pudo cargar los hoteles.';
        this.loading = false;
        this.cdr.detectChanges();
      },
    });
  }
  
  private showConfirmationList(hotels: any[]): void {
    console.log('Unconfirmed Hotels:', hotels);
  }
}