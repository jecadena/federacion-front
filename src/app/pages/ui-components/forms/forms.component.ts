import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-forms',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    MatRadioModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatCheckboxModule,
    MatTableModule
  ],
  templateUrl: './forms.component.html',
})
export class AppFormsComponent implements OnInit {
  displayedColumns: string[] = ['title', 'name', 'country', 'contactPerson', 'phone', 'email', 'mobile'];
  federationData: any[] = [];  // Array que contendrá los datos de la federación

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    // Fetch data from the backend and store it in federationData array
    this.http.get<any>('http://localhost:3000/api/getFederationData')
      .subscribe(data => {
        // Asegúrate de que el dato recibido es un array
        if (Array.isArray(data)) {
          this.federationData = data;  // Asignamos directamente el arreglo
        } else {
          this.federationData = [data]; // Si no es un array, lo envolvemos en uno
        }
      });
      console.log("Datos: ", this.federationData);  // Verifica que los datos se están cargando correctamente
  }

  submitForm() {
    console.log(this.federationData);
    // Handle form submission logic here (e.g., POST request)
  }

  cancelForm() {
    console.log('Form canceled');
  }
}
