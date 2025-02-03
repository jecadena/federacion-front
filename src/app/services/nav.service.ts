import { Injectable } from '@angular/core';
import { Event, NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({ providedIn: 'root' })
export class NavService {
    showClass: any = false;
    public currentUrl = new BehaviorSubject<any>(undefined);

    constructor(private http: HttpClient, private router: Router) {
        this.router.events.subscribe((event: Event) => {
            if (event instanceof NavigationEnd) {
                this.currentUrl.next(event.urlAfterRedirects);
            }
        });
    }

    getHotelsByFederation(federacionId: string): Observable<any[]> {
        return this.http.get<any[]>(`http://localhost:3000/api/hotels?federation_id=${federacionId}`);
      }
      
      confirmationHotels(federacionId: string): Observable<any[]> {
        return this.http.get<any[]>(`http://localhost:3000/api/hotelsPreview?federation_id=${federacionId}`);
      }      
      
}
