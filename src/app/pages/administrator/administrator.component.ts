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
  countries = [
    { name: 'Afghanistan', code: '+93' },
    { name: 'Albania', code: '+355' },
    { name: 'Algeria', code: '+213' },
    { name: 'Andorra', code: '+376' },
    { name: 'Angola', code: '+244' },
    { name: 'Antigua and Barbuda', code: '+1-268' },
    { name: 'Argentina', code: '+54' },
    { name: 'Armenia', code: '+374' },
    { name: 'Australia', code: '+61' },
    { name: 'Austria', code: '+43' },
    { name: 'Azerbaijan', code: '+994' },
    { name: 'Bahamas', code: '+1-242' },
    { name: 'Bahrain', code: '+973' },
    { name: 'Bangladesh', code: '+880' },
    { name: 'Barbados', code: '+1-246' },
    { name: 'Belarus', code: '+375' },
    { name: 'Belgium', code: '+32' },
    { name: 'Belize', code: '+501' },
    { name: 'Benin', code: '+229' },
    { name: 'Bhutan', code: '+975' },
    { name: 'Bolivia', code: '+591' },
    { name: 'Bosnia and Herzegovina', code: '+387' },
    { name: 'Botswana', code: '+267' },
    { name: 'Brazil', code: '+55' },
    { name: 'Brunei', code: '+673' },
    { name: 'Bulgaria', code: '+359' },
    { name: 'Burkina Faso', code: '+226' },
    { name: 'Burundi', code: '+257' },
    { name: 'Cabo Verde', code: '+238' },
    { name: 'Cambodia', code: '+855' },
    { name: 'Cameroon', code: '+237' },
    { name: 'Canada', code: '+1' },
    { name: 'Central African Republic', code: '+236' },
    { name: 'Chad', code: '+235' },
    { name: 'Chile', code: '+56' },
    { name: 'China', code: '+86' },
    { name: 'Colombia', code: '+57' },
    { name: 'Comoros', code: '+269' },
    { name: 'Congo (Congo-Brazzaville)', code: '+242' },
    { name: 'Costa Rica', code: '+506' },
    { name: 'Croatia', code: '+385' },
    { name: 'Cuba', code: '+53' },
    { name: 'Cyprus', code: '+357' },
    { name: 'Czech Republic', code: '+420' },
    { name: 'Democratic Republic of the Congo', code: '+243' },
    { name: 'Denmark', code: '+45' },
    { name: 'Djibouti', code: '+253' },
    { name: 'Dominica', code: '+1-767' },
    { name: 'Dominican Republic', code: '+1-809' },
    { name: 'Ecuador', code: '+593' },
    { name: 'Egypt', code: '+20' },
    { name: 'El Salvador', code: '+503' },
    { name: 'Equatorial Guinea', code: '+240' },
    { name: 'Eritrea', code: '+291' },
    { name: 'Estonia', code: '+372' },
    { name: 'Eswatini', code: '+268' },
    { name: 'Ethiopia', code: '+251' },
    { name: 'Fiji', code: '+679' },
    { name: 'Finland', code: '+358' },
    { name: 'France', code: '+33' },
    { name: 'Gabon', code: '+241' },
    { name: 'Gambia', code: '+220' },
    { name: 'Georgia', code: '+995' },
    { name: 'Germany', code: '+49' },
    { name: 'Ghana', code: '+233' },
    { name: 'Greece', code: '+30' },
    { name: 'Grenada', code: '+1-473' },
    { name: 'Guatemala', code: '+502' },
    { name: 'Guinea', code: '+224' },
    { name: 'Guinea-Bissau', code: '+245' },
    { name: 'Guyana', code: '+592' },
    { name: 'Haiti', code: '+509' },
    { name: 'Honduras', code: '+504' },
    { name: 'Hungary', code: '+36' },
    { name: 'Iceland', code: '+354' },
    { name: 'India', code: '+91' },
    { name: 'Indonesia', code: '+62' },
    { name: 'Iran', code: '+98' },
    { name: 'Iraq', code: '+964' },
    { name: 'Ireland', code: '+353' },
    { name: 'Israel', code: '+972' },
    { name: 'Italy', code: '+39' },
    { name: 'Jamaica', code: '+1-876' },
    { name: 'Japan', code: '+81' },
    { name: 'Jordan', code: '+962' },
    { name: 'Kazakhstan', code: '+7' },
    { name: 'Kenya', code: '+254' },
    { name: 'Kiribati', code: '+686' },
    { name: 'Korea (North)', code: '+850' },
    { name: 'Korea (South)', code: '+82' },
    { name: 'Kuwait', code: '+965' },
    { name: 'Kyrgyzstan', code: '+996' },
    { name: 'Laos', code: '+856' },
    { name: 'Latvia', code: '+371' },
    { name: 'Lebanon', code: '+961' },
    { name: 'Lesotho', code: '+266' },
    { name: 'Liberia', code: '+231' },
    { name: 'Libya', code: '+218' },
    { name: 'Liechtenstein', code: '+423' },
    { name: 'Lithuania', code: '+370' },
    { name: 'Luxembourg', code: '+352' },
    { name: 'Madagascar', code: '+261' },
    { name: 'Malawi', code: '+265' },
    { name: 'Malaysia', code: '+60' },
    { name: 'Maldives', code: '+960' },
    { name: 'Mali', code: '+223' },
    { name: 'Malta', code: '+356' },
    { name: 'Marshall Islands', code: '+692' },
    { name: 'Mauritania', code: '+222' },
    { name: 'Mauritius', code: '+230' },
    { name: 'Mexico', code: '+52' },
    { name: 'Micronesia', code: '+691' },
    { name: 'Moldova', code: '+373' },
    { name: 'Monaco', code: '+377' },
    { name: 'Mongolia', code: '+976' },
    { name: 'Montenegro', code: '+382' },
    { name: 'Morocco', code: '+212' },
    { name: 'Mozambique', code: '+258' },
    { name: 'Myanmar', code: '+95' },
    { name: 'Namibia', code: '+264' },
    { name: 'Nauru', code: '+674' },
    { name: 'Nepal', code: '+977' },
    { name: 'Netherlands', code: '+31' },
    { name: 'New Zealand', code: '+64' },
    { name: 'Nicaragua', code: '+505' },
    { name: 'Niger', code: '+227' },
    { name: 'Nigeria', code: '+234' },
    { name: 'North Macedonia', code: '+389' },
    { name: 'Norway', code: '+47' },
    { name: 'Oman', code: '+968' },
    { name: 'Pakistan', code: '+92' },
    { name: 'Palau', code: '+680' },
    { name: 'Panama', code: '+507' },
    { name: 'Papua New Guinea', code: '+675' },
    { name: 'Paraguay', code: '+595' },
    { name: 'Peru', code: '+51' },
    { name: 'Philippines', code: '+63' },
    { name: 'Poland', code: '+48' },
    { name: 'Portugal', code: '+351' },
    { name: 'Qatar', code: '+974' },
    { name: 'Romania', code: '+40' },
    { name: 'Russia', code: '+7' },
    { name: 'Rwanda', code: '+250' },
    { name: 'Saint Kitts and Nevis', code: '+1-869' },
    { name: 'Saint Lucia', code: '+1-758' },
    { name: 'Saint Vincent and the Grenadines', code: '+1-784' },
    { name: 'Samoa', code: '+685' },
    { name: 'San Marino', code: '+378' },
    { name: 'Sao Tome and Principe', code: '+239' },
    { name: 'Saudi Arabia', code: '+966' },
    { name: 'Senegal', code: '+221' },
    { name: 'Serbia', code: '+381' },
    { name: 'Seychelles', code: '+248' },
    { name: 'Sierra Leone', code: '+232' },
    { name: 'Singapore', code: '+65' },
    { name: 'Slovakia', code: '+421' },
    { name: 'Slovenia', code: '+386' },
    { name: 'Solomon Islands', code: '+677' },
    { name: 'Somalia', code: '+252' },
    { name: 'South Africa', code: '+27' },
    { name: 'South Sudan', code: '+211' },
    { name: 'Spain', code: '+34' },
    { name: 'Sri Lanka', code: '+94' },
    { name: 'Sudan', code: '+249' },
    { name: 'Suriname', code: '+597' },
    { name: 'Sweden', code: '+46' },
    { name: 'Switzerland', code: '+41' },
    { name: 'Syria', code: '+963' },
    { name: 'Taiwan', code: '+886' },
    { name: 'Tajikistan', code: '+992' },
    { name: 'Tanzania', code: '+255' },
    { name: 'Thailand', code: '+66' },
    { name: 'Timor-Leste', code: '+670' },
    { name: 'Togo', code: '+228' },
    { name: 'Tonga', code: '+676' },
    { name: 'Trinidad and Tobago', code: '+1-868' },
    { name: 'Tunisia', code: '+216' },
    { name: 'Turkey', code: '+90' },
    { name: 'Turkmenistan', code: '+993' },
    { name: 'Tuvalu', code: '+688' },
    { name: 'Uganda', code: '+256' },
    { name: 'Ukraine', code: '+380' },
    { name: 'United Arab Emirates', code: '+971' },
    { name: 'United Kingdom', code: '+44' },
    { name: 'United States', code: '+1' },
    { name: 'Uruguay', code: '+598' },
    { name: 'Uzbekistan', code: '+998' },
    { name: 'Vanuatu', code: '+678' },
    { name: 'Vatican City', code: '+39' },
    { name: 'Venezuela', code: '+58' },
    { name: 'Vietnam', code: '+84' },
    { name: 'Yemen', code: '+967' },
    { name: 'Zambia', code: '+260' },
    { name: 'Zimbabwe', code: '+263' }
  ];
  country: string = '';
  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadFederations();
  }

  getCountryName(code: string): string {
    const country = this.countries.find(c => c.code === code);
    return country ? country.name : 'Desconocido';
  }

  editFederation(federation: any): void {
    this.country = this.getCountryName(federation.n_country);
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
              <label for="c_person" class="form-label"><strong>País</strong></label>
            </div>
            <div class="col-md-9">
              <input type="text" class="form-control" id="c_person" readonly value="${this.country}">
            </div>
          </div>
  
          <div class="row mb-1">
            <div class="col-md-3 pt-2 bg-primary-subtle border-bottom text-left">
              <label for="mobile_number" class="form-label"><strong>Teléfono</strong></label>
            </div>
            <div class="col-md-9">
              <input type="text" class="form-control" id="mobile_number" value="${federation.mobile_number}">
            </div>
          </div>
  
          <div class="row mb-1">
            <div class="col-md-3 pt-2 bg-primary-subtle border-bottom text-left">
              <label for="email_address" class="form-label"><strong>Dirección</strong></label>
            </div>
            <div class="col-md-9">
              <input type="email" class="form-control" id="email_address" value="${federation.n_address}">
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
        const mobile_number = (document.getElementById('mobile_number') as HTMLInputElement).value;
        const n_address = (document.getElementById('n_address') as HTMLInputElement).value;
  
        return new Promise<void>((resolve, reject) => {
          fetch(`http://localhost:3000/api/datosFederation/${federation.id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              n_federacion,
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

  /*editContactFederation(federation: any): void {
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
        const p_number = (document.getElementById('p_number') as HTMLInputElement).value;
        const n_address = (document.getElementById('n_address') as HTMLInputElement).value;
 
        return new Promise<void>((resolve, reject) => {
          fetch(`http://localhost:3000/api/datosFederation/${federation.id}`, {
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
  }*/
  
  
  // Método para recargar la lista de federaciones
  loadFederations(): void {
    fetch('http://localhost:3000/api/federations')
      .then(response => response.json())
      .then(data => {
        this.federations = data;  // Asigna los datos obtenidos a la lista
        console.log("DATOS DE FEDERACIONES:", this.federations);
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
  
      // Obtener los hoteles ya aprobados
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
                  <th class="text-left">Single</th>
                  <th class="text-left">Double</th>
                  <th class="text-left">Triple</th>
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
                                  <td class="text-left">25</td>
                                  <td class="text-left">12</td>
                                  <td class="text-left">5</td>
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
          width: "70%",
        }).then((result) => {
          if (result.isConfirmed) {
            const checkboxes = document.querySelectorAll<HTMLInputElement>('.hotel-checkbox:checked');
            const selectedHotels = Array.from(checkboxes).map(cb => cb.value);
  
            if (selectedHotels.length === 0) {
              // Si no hay seleccionados, eliminar todos los registros con ese federationId
              this.http.post('http://localhost:3000/api/hotels', { selectedHotels: [], federationId }).subscribe(() => {
                Swal.fire('¡Todos los hoteles han sido eliminados!', '', 'success');
              });
            } else {
              // Guardar los seleccionados
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
