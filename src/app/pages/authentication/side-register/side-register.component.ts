import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common'; // Importa CommonModule para *ngIf
import Swal from 'sweetalert2';  // Importa SweetAlert2

@Component({
  selector: 'app-side-register',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    CommonModule  // Asegúrate de incluir CommonModule para usar *ngIf
  ],
  templateUrl: './side-register.component.html',
})
export class AppSideRegisterComponent {
  form = new FormGroup({
    n_federacion: new FormControl('', [Validators.required]),
    n_country: new FormControl('', [Validators.required]),
    c_person: new FormControl('', [Validators.required]),
    p_number: new FormControl(''),
    email_address: new FormControl('', [Validators.required, Validators.email]),
    mobile_number: new FormControl('', [Validators.required]),
    clave: new FormControl('', [Validators.required]) // Añade el control 'clave'
  });

  constructor(private http: HttpClient) {}

  get f() {
    return this.form.controls;
  }

  submit() {
    if (this.form.valid) {
      this.http.post('http://localhost:3000/api/federacion', this.form.value).subscribe({
        next: (response) => {
          console.log('Federación guardada:', response);
          
          // Mostrar un Toast de SweetAlert2 indicando que el registro fue exitoso
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Registro exitoso',
            showConfirmButton: false,
            timer: 1500
          }).then(() => {
            // Redirigir a la ruta de login
            window.location.href = '/ui-components/forms';  // Asegúrate de tener la ruta configurada en tu router
          });
        },
        error: (error) => {
          console.error('Error al guardar la federación:', error);
          
          // Mostrar un Toast de SweetAlert2 indicando que ocurrió un error
          Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: 'Ocurrió un error',
            showConfirmButton: false,
            timer: 1500
          });
        },
      });
    }
  }
}
