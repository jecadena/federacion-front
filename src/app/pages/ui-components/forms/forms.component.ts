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
import { NavService } from '../../..//services/nav.service';
import { MenuUpdateService } from 'src/app/services/menu-update.service';
import Swal from 'sweetalert2';

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
  menuItems: any[] = []; // Propiedad para almacenar los ítems del menú dinámico
  selectedFederationId: string = ''; // ID de la federación seleccionada

  tableRows: any[] = [];
  contactBlocks: any[] = [];
  tableBlocks: any[] = [];
  tableTripleRows: any[] = [];

  id: string = '';
  federationName: string = '';
  country: string = '';
  contactPerson: string = '';
  phoneNumber: string = '';
  emailAddress: string = '';
  mobileNumber: string = '';
  hotelName: string = '';

  constructor(private http: HttpClient, public navService: NavService, private menuUpdateService: MenuUpdateService) {}

  ngOnInit(): void {
    this.fetchFederationData();
    this.initializeTableRows();
    this.initializeContactBlocks();
    this.initializeTableBlocks();
    this.initializeTripleRows();
  }

  guardar(): void {
    const federationDataToUpdate = {
      id: this.id,
      n_federacion: this.federationName,
      n_country: this.country,
      c_person: this.contactPerson,
      p_number: this.phoneNumber,
      email_address: this.emailAddress,
      mobile_number: this.mobileNumber,
    };

    this.http.post('http://localhost:3000/api/updateFederationData', federationDataToUpdate).subscribe(
      (response) => {
        console.log('Federación actualizada correctamente:', response);

        // Verificar si hotelName no está vacío
        if (this.hotelName && this.hotelName.trim() !== '') {
          const hotelData = {
            nombre_hotel: this.hotelName.trim(),
            federacion_id: this.id,
            f_registro: new Date().toISOString().slice(0, 19).replace('T', ' '),
          };

          this.http.post('http://localhost:3000/api/checkAndUpdateHotel', hotelData).subscribe(
            (checkResponse: any) => {
              if (checkResponse.exists) {
                Swal.fire({
                  title: 'El hotel ya existe',
                  text: '¿Desea sobreescribir los datos?',
                  icon: 'warning',
                  showCancelButton: true,
                  confirmButtonText: 'Sí, sobreescribir',
                  cancelButtonText: 'Cancelar',
                }).then((result) => {
                  if (result.isConfirmed) {
                    this.http.put('http://localhost:3000/api/updateHotel', hotelData).subscribe(
                      (updateResponse) => {
                        console.log('Hotel actualizado:', updateResponse);
                        Swal.fire({
                          icon: 'success',
                          title: 'Hotel actualizado',
                          showConfirmButton: false,
                          timer: 2000,
                          toast: true,
                          position: 'top-end',
                        });
                        this.menuUpdateService.triggerMenuUpdate();  // Actualiza el menú después de guardar el hotel
                      },
                      (updateError) => {
                        console.error('Error al actualizar el hotel:', updateError);
                        Swal.fire({
                          icon: 'error',
                          title: 'Error al actualizar el hotel',
                          showConfirmButton: false,
                          timer: 2000,
                          toast: true,
                          position: 'top-end',
                        });
                      }
                    );
                  }
                });
              } else {
                this.http.post('http://localhost:3000/api/registerHotel', hotelData).subscribe(
                  (hotelResponse) => {
                    console.log('Hotel registrado correctamente:', hotelResponse);
                    Swal.fire({
                      icon: 'success',
                      title: 'Federación y hotel actualizados',
                      showConfirmButton: false,
                      timer: 2000,
                      toast: true,
                      position: 'top-end',
                    });
                    this.menuUpdateService.triggerMenuUpdate();  // Actualiza el menú después de registrar el hotel
                  },
                  (hotelError) => {
                    console.error('Error al registrar el hotel:', hotelError);
                    Swal.fire({
                      icon: 'error',
                      title: 'Error al registrar el hotel',
                      showConfirmButton: false,
                      timer: 2000,
                      toast: true,
                      position: 'top-end',
                    });
                  }
                );
              }
            },
            (checkError) => {
              console.error('Error al verificar el hotel:', checkError);
              Swal.fire({
                icon: 'error',
                title: 'Error al verificar el hotel',
                showConfirmButton: false,
                timer: 2000,
                toast: true,
                position: 'top-end',
              });
            }
          );
        } else {
          Swal.fire({
            icon: 'success',
            title: 'Federación actualizada',
            showConfirmButton: false,
            timer: 2000,
            toast: true,
            position: 'top-end',
            background: '#fff',
            color: '#28a745',
            iconColor: '#28a745',
            customClass: {
              popup: 'toast-popup-success',
            },
          });
          this.menuUpdateService.triggerMenuUpdate();  // Actualiza el menú solo si la federación fue actualizada
        }
      },
      (error) => {
        console.error('Error al actualizar federación:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error al actualizar federación',
          showConfirmButton: false,
          timer: 2000,
          toast: true,
          position: 'top-end',
          background: '#fff',
          color: '#dc3545',
          iconColor: '#dc3545',
          customClass: {
            popup: 'toast-popup-error',
          },
        });
      }
    );
  }

  fetchFederationData(): void {
    this.http.get<any[]>('http://localhost:3000/api/getFederationData').subscribe(
      (data) => {
        if (Array.isArray(data) && data.length > 0) {
          this.federationData = data;
          this.selectedFederationId = data[0].id;
          this.setFormData(this.federationData[0]);
        } else {
          this.federationData = [];
          console.error('Error: No se encontraron datos de federaciones.');
        }
      },
      (error) => {
        console.error('Error al obtener datos de la API', error);
      }
    );
  }

  updateMenuItems(federationId: string): void {
    // Llamar al servicio para obtener los ítems del menú en base al federationId
    this.navService.getHotelsByFederation(federationId).subscribe(
      (data) => {
        this.menuItems = data.map((item) => ({
          displayName: item.name,
          route: `/hotels/${item.id}`,
        }));
      },
      (error) => {
        console.error('Error al obtener ítems del menú:', error);
        this.menuItems = [];
      }
    );
  }

  onFederationChange(event: any): void {
    const selectedFederation = this.federationData.find((f) => f.id === event.value);
    if (selectedFederation) {
      this.selectedFederationId = selectedFederation.id;
      this.setFormData(selectedFederation); // Actualiza los datos del formulario
      this.updateMenuItems(this.selectedFederationId); // Actualiza los ítems del menú
    }
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

  updateFederationData(): void {
    if (this.federationData.length > 0) {
      this.federationData[0] = {
        id: this.id,
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

  cancelForm(): void {
    if (this.federationData.length > 0) {
      this.setFormData(this.federationData[0]);
    }
    console.log('Formulario cancelado y restablecido a los valores iniciales');
  }

  initializeTableRows(): void {
    this.tableRows = [
      {
        id: 1,
        familyName: '',
        firstName: '',
        passportNumber: '',
        dayArrival: '',
        dayDeparture: '',
        tipo_habitacion: 'S', // Campo oculto
      },
    ];
  }
  

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


  addRow(): void {
    const newRow = {
      id: this.tableRows.length + 1,
      familyName: '',
      firstName: '',
      passportNumber: '',
      dayArrival: '',
      dayDeparture: '',
      tipo_habitacion: 'S', // Campo oculto
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
