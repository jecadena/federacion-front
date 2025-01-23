import { Component } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MaterialModule } from '../../../material.module';
import { MatButtonModule } from '@angular/material/button';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment'; // Asegúrate de tener la URL del backend
import Swal from 'sweetalert2'; // Para mostrar mensajes tipo SweetAlert

@Component({
  selector: 'app-side-login',
  standalone: true,
  imports: [
    RouterModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
  ],
  templateUrl: './side-login.component.html',
})
export class AppSideLoginComponent {
  constructor(private router: Router, private http: HttpClient) {}

  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  get f() {
    return this.form.controls;
  }

  submit() {
    if (this.form.invalid) {
      return;
    }
  
    const loginData = {
      email_address: this.form.value.email,  // Cambiar 'email' a 'email_address'
      clave: this.form.value.password,        // Cambiar 'password' a 'clave'
    };
  
    // Llamada HTTP al backend para verificar las credenciales
    this.http.post<{ message: string; token: string }>(`${environment.apiUrl}/api/login`, loginData)
      .subscribe(
        response => {
          localStorage.setItem('token', response.token);
          this.router.navigate(['/ui-components/forms']); // Redirige a la página deseada
  
          // Opcional: Mostrar mensaje de éxito
          Swal.fire({
            icon: 'success',
            title: '¡Login exitoso!',
            text: 'Estás ingresando al sistema.',
          });
        },
        error => {
          console.error('Error en el login', error);
          Swal.fire({
            icon: 'error',
            title: '¡Error!',
            text: 'Correo o clave incorrectos',
          });
        }
      );
  }
  
}
