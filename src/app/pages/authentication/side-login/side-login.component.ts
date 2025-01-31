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
import { UserDataService } from '../../../services/user-data.service';
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
  rememberMe: boolean = false;
  constructor(
    private router: Router, 
    private http: HttpClient, 
    private userDataService: UserDataService
  ) {}

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
      email_address: this.form.value.email,
      clave: this.form.value.password,
    };
  
    this.http.post<any>(`${environment.apiUrl}/api/login`, loginData).subscribe(
      (response) => {
        // Guarda el token y los datos del usuario
        localStorage.setItem('token', response.token);
        if (this.rememberMe) {
          // Si el usuario seleccionó "Remember this device", guarda el token por más tiempo
          localStorage.setItem('rememberMe', 'true');
          localStorage.setItem('userData', JSON.stringify(response));  // Guarda la data del usuario si es necesario
        } else {
          // Si no lo seleccionó, guarda solo en sessionStorage o simplemente usa la sesión temporal
          sessionStorage.setItem('token', response.token);
        }
        this.userDataService.setUserData(response); // Almacena los datos en el servicio
  
        
  
        // Navega según el rol del usuario
        if (response.role === 'ADMIN') {
          // Muestra un mensaje de éxito como toast
        Swal.fire({
          icon: 'success',
          title: 'Ha ingresado al sistema',
          text: '',
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
        });
          this.router.navigate(['/administrator']);
        } else if (response.role === 'USER') {
          // Muestra un mensaje de éxito como toast
          Swal.fire({
            icon: 'success',
            title: 'Logged in',
            text: '',
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
          });
          this.router.navigate(['/ui-components/forms']);
        }
      },
      (error) => {
        console.error('Error en el login', error);
        // Muestra un mensaje de error como toast
        Swal.fire({
          icon: 'error',
          title: '¡Error!',
          text: 'Correo o clave incorrectos',
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
        });
      }
    );
  }
  

  // Verificar si "Remember this device" estaba seleccionado en un login previo
  ngOnInit() {
    if (localStorage.getItem('rememberMe') === 'true') {
      const userData = JSON.parse(localStorage.getItem('userData') || '{}');
      // Rellenar los campos si la sesión se debe recordar (esto es opcional)
      if (userData) {
        this.form.patchValue({
          email: userData.email_address,
          password: userData.clave,
        });
        this.rememberMe = true;
      }
    }
  }
}