import { Component, EventEmitter, Input, OnInit, Output, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrandingComponent } from './branding.component';
import { TablerIconsModule } from 'angular-tabler-icons';
import { MaterialModule } from 'src/app/material.module';
import { NavService } from 'src/app/services/nav.service';
import { NavItem } from './nav-item/nav-item';
import { RouterModule } from '@angular/router';
import { baseNavItems } from './sidebar-data';
import { MenuUpdateService } from 'src/app/services/menu-update.service';
import { UserDataService } from 'src/app/services/user-data.service';
import { Subscription } from 'rxjs';

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
export class SidebarComponent implements OnInit, OnDestroy {
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
  private menuSubscription: Subscription | undefined;
  private isLoading = false; // Evitar llamadas múltiples

  constructor(
    private navService: NavService,
    private sidebarDataService: MenuUpdateService,
    private cdr: ChangeDetectorRef,
    private userDataService: UserDataService
  ) {}

  ngOnInit(): void {
    this.loadUserData();
    this.menuSubscription = this.sidebarDataService.navItems$.subscribe(() => {
      if (!this.isLoading) {
        this.loadMenu(true);
      }
    });
  }

  private loadUserData(): void {
    const userData = this.userDataService.getStoredUserData();
    if (userData) {
      this.userRole = userData.role;
      this.userId = userData.data.id;
      this.showAdminTable = this.userRole !== 'USER';
      this.loadMenu(false);
    } else {
      this.errorMessage = 'No se encontró información del usuario.';
      this.loading = false;
    }
  }

  private loadMenu(update: boolean): void {
    if (this.isLoading) return; // Evita llamadas simultáneas
    this.isLoading = true;
    this.navItems = [...baseNavItems];
    const federationId = this.userId || '13';

    this.navService.getHotelsByFederation(federationId).subscribe({
      next: (hotels) => {
        this.updateHotels(hotels, federationId);
        this.isLoading = false;
        if (update) this.sidebarDataService.updateNavItems(this.navItems);
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Error al cargar los hoteles:', error);
        this.errorMessage = 'No se pudo cargar los hoteles.';
        this.isLoading = false;
        this.cdr.detectChanges();
      },
    });
  }

  private updateHotels(hotels: any[], federationId: string): void {
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
          }
          this.cdr.detectChanges();
        },
        error: (error) => {
          console.error('Error al cargar hoteles sin confirmar:', error);
          this.errorMessage = 'No se pudo cargar los hoteles sin confirmar.';
          this.cdr.detectChanges();
        },
      });
    }
  }

  ngOnDestroy(): void {
    this.menuSubscription?.unsubscribe();
  }
}