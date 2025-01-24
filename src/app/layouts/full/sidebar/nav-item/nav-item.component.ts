import {
  Component,
  Input,
  OnChanges,
  Output,
  EventEmitter,
  OnInit
} from '@angular/core';
import { NavItem } from './nav-item';
import { Router } from '@angular/router';
import { NavService } from '../../../../services/nav.service';
import { TranslateModule } from '@ngx-translate/core';
import { MaterialModule } from 'src/app/material.module';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-nav-item',
  standalone: true,
  imports: [TranslateModule, MaterialModule, CommonModule],
  templateUrl: './nav-item.component.html',
  styleUrls: [],
})
export class AppNavItemComponent implements OnChanges {
  displayedColumns: string[] = [
    'id',
    'title',
    'name',
    'country',
    'contactPerson',
    'phone',
    'email',
    'mobile',
  ];

  federationData: any[] = [];
  id: string = '';
  federationName: string = '';
  country: string = '';
  contactPerson: string = '';
  phoneNumber: string = '';
  emailAddress: string = '';
  mobileNumber: string = '';
  hotelName: string = '';
  @Output() toggleMobileLink: any = new EventEmitter<void>();
  @Output() notify: EventEmitter<boolean> = new EventEmitter<boolean>();

  //@HostBinding('attr.aria-expanded') ariaExpanded = this.expanded;
  @Input() item: NavItem | any;
  @Input() depth: any;

  constructor(private http: HttpClient, public navService: NavService, public router: Router) {
    if (this.depth === undefined) {
      this.depth = 0;
    }
  }

  ngOnInit(): void {
    this.fetchFederationData();
  }

  ngOnChanges() {
    this.navService.currentUrl.subscribe((url: string) => {});
  }

  onItemSelected(item: NavItem) {
    this.router.navigate([item.route]);

    //scroll
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }

  onSubItemSelected(item: NavItem) {
    
  }

  fetchFederationData(): void {
    this.http.get<any[]>('http://localhost:3000/api/getFederationData').subscribe(
      (data) => {
        if (Array.isArray(data) && data.length > 0) {
          this.federationData = data;
          this.setFormData(this.federationData[0]);
        } else {
          this.federationData = [];
          console.error('Error: El dato recibido no es un array o está vacío', data);
        }
      },
      (error) => {
        console.error('Error al obtener datos de la API', error);
      }
    );
  }

  setFormData(data: any): void {
    this.id = data.id || '';
    this.federationName = data.n_federacion || '';
    this.country = data.n_country || '';
    this.contactPerson = data.c_person || '';
    this.phoneNumber = data.p_number || '';
    this.emailAddress = data.email_address || '';
    this.mobileNumber = data.mobile_number || '';
    this.hotelName = data.h_name || '';
  }
}
