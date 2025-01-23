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
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-forms',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    MatRadioModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatCheckboxModule,
    MatTableModule,
  ],
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.scss'],
})
export class AppFormsComponent implements OnInit {
  displayedColumns: string[] = [
    'title',
    'name',
    'country',
    'contactPerson',
    'phone',
    'email',
    'mobile',
  ];

  federationData: any[] = [];
  tableRows: any[] = []; // Propiedad para la tabla dinámica
  contactBlocks: any[] = []; // Nueva propiedad para bloques de contactos
  tableBlocks: any[] = []; // Propiedad faltante para bloques de tabla
  tableTripleRows: any[] = [];

  federationName: string = '';
  country: string = '';
  contactPerson: string = '';
  phoneNumber: string = '';
  emailAddress: string = '';
  mobileNumber: string = '';
  hotelName: string = '';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchFederationData();
    this.initializeTableRows(); // Inicializar filas de la tabla
    this.initializeContactBlocks(); // Inicializar bloques de contacto
    this.initializeTableBlocks(); // Inicializar bloques de tabla
    this.initializeTripleRows();
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
    this.federationName = data.n_federacion || '';
    this.country = data.n_country || '';
    this.contactPerson = data.c_person || '';
    this.phoneNumber = data.p_number || '';
    this.emailAddress = data.email_address || '';
    this.mobileNumber = data.mobile_number || '';
    this.hotelName = data.h_name || '';
  }

  updateFederationData(): void {
    if (this.federationData.length > 0) {
      this.federationData[0] = {
        n_federacion: this.federationName,
        n_country: this.country,
        c_person: this.contactPerson,
        p_number: this.phoneNumber,
        email_address: this.emailAddress,
        mobile_number: this.mobileNumber,
        h_name: this.hotelName,
      };
    }
  }

  submitForm(): void {
    const payload = {
      federationData: this.federationData,
      tableRows: this.tableRows, // Adjuntar datos de la tabla dinámica
      contactBlocks: this.contactBlocks, // Adjuntar bloques de contacto
      tableBlocks: this.tableBlocks, // Adjuntar bloques de tabla
    };

    console.log('Datos enviados:', payload);

    this.http
      .post('http://localhost:3000/api/updateFederationData', payload)
      .subscribe(
        (response) => {
          console.log('Datos enviados correctamente:', response);
        },
        (error) => {
          console.error('Error al enviar los datos:', error);
        }
      );
  }

  cancelForm(): void {
    if (this.federationData.length > 0) {
      this.setFormData(this.federationData[0]);
    }
    console.log('Formulario cancelado y restablecido a los valores iniciales');
  }

  /**
   * Inicializa las filas de la tabla con datos de ejemplo.
   */
  initializeTableRows(): void {
    this.tableRows = [
      {
        id: 1,
        familyName: '',
        firstName: '',
        passportNumber: '',
        dayArrival: '',
        dayDeparture: '',
      },
    ];
  }

  /**
   * Inicializa los bloques de contacto con un bloque vacío.
   */
  initializeContactBlocks(): void {
    this.contactBlocks = [
      {
        id: 1,
        contactPerson: '',
        phoneNumber: '',
        emailAddress: '',
        mobileNumber: '',
      },
    ];
  }

  /**
   * Inicializa los bloques de tabla con datos de ejemplo.
   */
  initializeTableBlocks(): void {
    this.tableBlocks = [
      {
        id: 1,
        title: '',
        name: '',
        country: '',
        contactPerson: '',
        phone: '',
        email: '',
        mobile: '',
      },
    ];
  }

  /**
   * Agrega un nuevo bloque de contacto.
   */
  addContactBlock(): void {
    const newBlock = {
      id: this.contactBlocks.length + 1,
      contactPerson: '',
      phoneNumber: '',
      emailAddress: '',
      mobileNumber: '',
    };
    this.contactBlocks.push(newBlock);
  }

  /**
   * Elimina un bloque de contacto.
   * @param index Índice del bloque de contacto a eliminar.
   */
  removeContactBlock(index: number): void {
    if (index > -1 && index < this.contactBlocks.length) {
      this.contactBlocks.splice(index, 1);
    }
  }

  /**
   * Agrega una nueva fila a la tabla dinámica.
   */
  addRow(): void {
    const newRow = {
      id: this.tableRows.length + 1,
      familyName: '',
      firstName: '',
      passportNumber: '',
      dayArrival: '',
      dayDeparture: '',
    };
    this.tableRows.push(newRow);
  }

  /**
   * Elimina una fila de la tabla dinámica.
   * @param index Índice de la fila a eliminar.
   */
  removeRow(index: number): void {
    if (index > -1 && index < this.tableRows.length) {
      this.tableRows.splice(index, 1);
    }
  }

  /**
   * Agrega un nuevo bloque a la tabla dinámica (para ser usado en el HTML).
   */
  /**
 * Agrega un nuevo bloque a la tabla dinámica (para ser usado en el HTML).
 */
/**
 * Agrega un nuevo bloque a la tabla dinámica (para ser usado en el HTML).
 */
addBlock(): void {
  const newBlock = {
    id: this.tableRows.length + 1,
    familyName: '',
    firstName: '',
    passportNumber: '',
    dayArrival: '',
    dayDeparture: '',
    familyName2: '',
    firstName2: '',
    passportNumber2: '',
    dayArrival2: '',
    dayDeparture2: ''
  };
  this.tableRows.push(newBlock);
}

removeBlock(index: number): void {
  if (index > -1 && index < this.tableRows.length) {
    this.tableRows.splice(index, 1);
  }
}

initializeTripleRows(): void {
  this.tableTripleRows = [
    {
      id: 1,
      familyName: '',
      firstName: '',
      passportNumber: '',
      dayArrival: '',
      dayDeparture: '',
      familyName2: '',
      firstName2: '',
      passportNumber2: '',
      dayArrival2: '',
      dayDeparture2: '',
      familyName3: '',
      firstName3: '',
      passportNumber3: '',
      dayArrival3: '',
      dayDeparture3: ''
    },
  ];
}

/**
 * Agrega un nuevo bloque a la tabla de tres filas.
 */
addTripleBlock(): void {
  const newBlock = {
    id: this.tableTripleRows.length + 1,
    familyName: '',
    firstName: '',
    passportNumber: '',
    dayArrival: '',
    dayDeparture: '',
    familyName2: '',
    firstName2: '',
    passportNumber2: '',
    dayArrival2: '',
    dayDeparture2: '',
    familyName3: '',
    firstName3: '',
    passportNumber3: '',
    dayArrival3: '',
    dayDeparture3: ''
  };
  this.tableTripleRows.push(newBlock);
}

/**
 * Elimina un bloque de tres filas.
 * @param index Índice del bloque de tres filas a eliminar.
 */
removeTripleBlock(index: number): void {
  if (index > -1 && index < this.tableTripleRows.length) {
    this.tableTripleRows.splice(index, 1);
  }
}
}
