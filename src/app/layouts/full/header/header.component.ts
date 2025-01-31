import { Component, Output, EventEmitter, Input, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { MaterialModule } from 'src/app/material.module';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { MatButtonModule } from '@angular/material/button';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { UserDataService } from 'src/app/services/user-data.service';  // Importa tu servicio

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, CommonModule, NgScrollbarModule, MaterialModule, MatButtonModule],
  templateUrl: './header.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class HeaderComponent {
  @Input() showToggle = true;
  @Input() toggleChecked = false;
  @Output() toggleMobileNav = new EventEmitter<void>();
  @Output() toggleCollapsed = new EventEmitter<void>();
  
  // Variables para mostrar la información dependiendo del role
  userRole: string | null = '';
  federationName: string | null = '';
  requesterName: string | null = '';
  nombre: string | null = '';

  constructor(private http: HttpClient, private router: Router, private userDataService: UserDataService) {}

  ngOnInit() {
    // Obtener los datos del usuario desde el servicio
    const userData = this.userDataService.getStoredUserData();
    if (userData && userData.data) {
      this.userRole = userData.role;
      // Verifica el role y asigna los valores correspondientes
      console.log("ROL HEADER: ", userData);

      if (this.userRole === 'USER') {
        this.federationName = userData.data.n_federacion;
      } else if (this.userRole === 'ADMIN') {
        this.requesterName = userData.data.de_nom_solicitante;
      }

      this.nombre = userData.data.de_nom_solicitante;
      console.log("nombre: ", this.nombre);
    }
  }

  logout() {
    this.http.post(`${environment.apiUrl}/api/logout`, {}).subscribe(
      (response) => {
        localStorage.removeItem('token');
        this.router.navigate(['/authentication/login']);
        if (this.userRole === 'USER') {
        // Mostrar mensaje de éxito
        Swal.fire({
          icon: 'success',
          title: 'You are logged out of the system',
          showConfirmButton: false,
          timer: 2000,
          toast: true,
          position: 'top-end',
          width: "auto",
        });}  else if (this.userRole === 'ADMIN') {
          Swal.fire({
            icon: 'success',
            title: 'Ha salido del sistema',
            showConfirmButton: false,
            timer: 2000,
            toast: true,
            position: 'top-end',
            width: "auto",
          });
        }
      },
      (error) => {
        console.error('Error en el logout', error);
        Swal.fire({
          icon: 'error',
          title: 'There was a problem logging out',
          showConfirmButton: false,
          timer: 2000,
          toast: true,
          position: 'top-end',
          width: "auto",
        });
      }
    );
  }
}
