import {
  Component,
  Output,
  EventEmitter,
  Input,
  ViewEncapsulation,
} from '@angular/core';
import { Router } from '@angular/router';  // Asegúrate de tener esta importación
import { MaterialModule } from 'src/app/material.module';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { MatButtonModule } from '@angular/material/button';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment'; // Asegúrate de tener la URL de tu backend
import Swal from 'sweetalert2';

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

  constructor(private http: HttpClient, private router: Router) {}  // Inyección correcta de Router

  // Método de logout
  logout() {
    // Llamar al endpoint de logout
    this.http.post(`${environment.apiUrl}/api/logout`, {}).subscribe(
      (response) => {
        // Eliminar el token del localStorage
        localStorage.removeItem('token');
        // Redirigir al login
        this.router.navigate(['/authentication/login']);
        
        // Mostrar mensaje de éxito
        Swal.fire({
          icon: 'success',
          title: '¡Logout exitoso!',
          text: 'Has cerrado sesión correctamente.',
        });
      },
      (error) => {
        console.error('Error en el logout', error);
        Swal.fire({
          icon: 'error',
          title: '¡Error!',
          text: 'Hubo un problema al cerrar sesión.',
        });
      }
    );
  }
}
