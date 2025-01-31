import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-administrator',
  standalone: true,
  imports: [
      CommonModule,
    ],
  templateUrl: './administrator.component.html',
  styleUrls: ['./administrator.component.scss']
})
export class AdministratorComponent implements OnInit {
  federations: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadFederations();
  }

  editFederation(federation: any): void {
    // Mostrar un modal con un formulario de edición
    Swal.fire({
      title: 'Editar Federación',
      html: `
        <form id="editFederationForm">
          <div class="row mb-1">
            <div class="col-md-3 pt-2 bg-primary-subtle border-bottom text-left">
              <label for="n_federacion" class="form-label"><strong>Federación</strong></label>
            </div>
            <div class="col-md-9">
              <input type="text" class="form-control" id="n_federacion" value="${federation.n_federacion}">
            </div>
          </div>
  
          <div class="row mb-1">
            <div class="col-md-3 pt-2 bg-primary-subtle border-bottom text-left">
              <label for="c_person" class="form-label"><strong>Contacto</strong></label>
            </div>
            <div class="col-md-9">
              <input type="text" class="form-control" id="c_person" value="${federation.c_person}">
            </div>
          </div>
  
          <div class="row mb-1">
            <div class="col-md-3 pt-2 bg-primary-subtle border-bottom text-left">
              <label for="p_number" class="form-label"><strong>Teléfono</strong></label>
            </div>
            <div class="col-md-9">
              <input type="text" class="form-control" id="p_number" value="${federation.p_number}">
            </div>
          </div>
  
          <div class="row mb-1">
            <div class="col-md-3 pt-2 bg-primary-subtle border-bottom text-left">
              <label for="email_address" class="form-label"><strong>Email</strong></label>
            </div>
            <div class="col-md-9">
              <input type="email" class="form-control" id="email_address" value="${federation.email_address}">
            </div>
          </div>
  
          <div class="row mb-1">
            <div class="col-md-3 pt-2 bg-primary-subtle border-bottom text-left">
              <label for="mobile_number" class="form-label"><strong>Móvil</strong></label>
            </div>
            <div class="col-md-9">
              <input type="text" class="form-control" id="mobile_number" value="${federation.mobile_number}">
            </div>
          </div>
  
          <div class="row mb-1">
            <div class="col-md-3 pt-2 bg-primary-subtle text-left">
              <label for="n_address" class="form-label"><strong>Dirección</strong></label>
            </div>
            <div class="col-md-9">
              <input type="text" class="form-control" id="n_address" value="${federation.n_address}">
            </div>
          </div>
        </form>
      `,
      showCancelButton: true,
      confirmButtonText: 'Guardar',
      cancelButtonText: 'Salir',
      width: "60%",
      preConfirm: () => {
        const n_federacion = (document.getElementById('n_federacion') as HTMLInputElement).value;
        const c_person = (document.getElementById('c_person') as HTMLInputElement).value;
        const p_number = (document.getElementById('p_number') as HTMLInputElement).value;
        const email_address = (document.getElementById('email_address') as HTMLInputElement).value;
        const mobile_number = (document.getElementById('mobile_number') as HTMLInputElement).value;
        const n_address = (document.getElementById('n_address') as HTMLInputElement).value;
  
        return new Promise<void>((resolve, reject) => {
          fetch(`http://localhost:3000/api/federation/${federation.id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              n_federacion,
              c_person,
              p_number,
              email_address,
              mobile_number,
              n_address
            })
          })
          .then(response => {
            if (!response.ok) {
              throw new Error('Error al actualizar la federación');
            }
            return response.text();  // Obtener la respuesta como texto
          })
          .then((message: string) => {  // El mensaje de la respuesta
            Swal.fire({
              toast: true,
              position: 'top-end',  
              icon: 'success', 
              title: message,
              showConfirmButton: false, 
              timer: 3000,
              timerProgressBar: true,
              width: "auto",
            });            
            
            // Recargar los datos después de la actualización
            this.loadFederations();  // Llama a tu método para cargar los datos actualizados
            
            resolve();
          })
          .catch((error) => {
            Swal.fire('Error', error.message, 'error');
            reject();
          });
        });
      },
    });
  }
  
  
  // Método para recargar la lista de federaciones
  loadFederations(): void {
    fetch('http://localhost:3000/api/federations')
      .then(response => response.json())
      .then(data => {
        this.federations = data;  // Asigna los datos obtenidos a la lista
      })
      .catch((error) => {
        console.error('Error al cargar federaciones:', error);
      });
  }  

  deleteFederation(federation: any): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: `¿Realmente deseas eliminar la federación ${federation.n_federacion}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar',
      preConfirm: () => {
        // Lógica para eliminar la federación (por ahora solo cierra el modal)
        return new Promise<void>((resolve) => {
          resolve();
        });
      },
    });
  }  

  showHotels(federationId: string): void {
    console.log('Hotel icon clicked for federation:', federationId);
    if (!federationId) return;
  
    this.http.get<any[]>(`http://localhost:3000/api/hotels/${federationId}`).subscribe((hotels) => {
      console.log('Hotels data:', hotels);
  
      const nombre_hotel = hotels.length > 0 ? hotels[0].n_federacion : 'Sin Federación';
  
      // Obtener los hoteles ya guardados para marcar checkboxes
      this.http.get<string[]>(`http://localhost:3000/api/approved-hotels/${federationId}`).subscribe((approvedHotels) => {
        
        Swal.fire({
          title: '',
          html: `
          <h5>APROBAR HOTELES PARA:</h5>
          <h6>${nombre_hotel}</h6>
            <table class="table table-bordered table-sm mt-2">
              <thead>
                <tr class="table-primary">
                  <th><input type="checkbox" id="select-all"></th>
                  <th class="text-left">Hotel</th>
                </tr>
              </thead>
              <tbody id="hotel-list">
                ${hotels
                  .map((hotel, index) => {
                    let rows = '';
                    ['n_hotel1', 'n_hotel2', 'n_hotel3'].forEach((key, i) => {
                      if (hotel[key]) {
                        const isChecked = approvedHotels.includes(hotel[key]) ? 'checked' : '';
                        rows += `<tr>
                                  <td class="text-left"><input type="checkbox" class="hotel-checkbox" id="hotel-checkbox-${index}-${i}" value="${hotel[key]}" ${isChecked}></td>
                                  <td class="text-left">${hotel[key]}</td>
                                </tr>`;
                      }
                    });
                    return rows;
                  })
                  .join('')}
              </tbody>
            </table>
          `,
          showCancelButton: true,
          confirmButtonText: 'Guardar',
          cancelButtonText: 'Cancelar',
        }).then((result) => {
          if (result.isConfirmed) {
            const checkboxes = document.querySelectorAll<HTMLInputElement>('.hotel-checkbox:checked');
            const selectedHotels = Array.from(checkboxes).map(cb => cb.value);
  
            if (selectedHotels.length === 0) {
              Swal.fire({
                icon: 'warning',
                title: 'No se seleccionó ningún hotel',
                toast: true,
                position: 'top-end',
                timer: 3000,
                showConfirmButton: false,
              });
            } else {
              this.http.post('http://localhost:3000/api/hotels', { selectedHotels, federationId }).subscribe(() => {
                Swal.fire('¡Guardado!', '', 'success');
              });
            }
          }
        });
  
        // Manejo de "Seleccionar todos"
        setTimeout(() => {
          const selectAll = document.getElementById('select-all') as HTMLInputElement;
          selectAll?.addEventListener('click', function () {
            const checkboxes = document.querySelectorAll<HTMLInputElement>('.hotel-checkbox');
            checkboxes.forEach(cb => (cb.checked = selectAll.checked));
          });
        }, 100);
      });
    });
  }

  toggleCheckboxes(checkbox: HTMLInputElement) {
    const checkboxes = document.querySelectorAll('.hotel-checkbox') as NodeListOf<HTMLInputElement>;
    checkboxes.forEach((cb) => {
      cb.checked = checkbox.checked;
    });
  }  
}
