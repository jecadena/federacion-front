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
import { ActivatedRoute } from '@angular/router';
import { UserDataService } from '../../../services/user-data.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import {FormControl} from '@angular/forms';
import {TooltipPosition, MatTooltipModule} from '@angular/material/tooltip';
import {CdkScrollable} from '@angular/cdk/scrolling';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
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
    RouterModule,
    MatTooltipModule, MatCardModule, MatInputModule, MatCheckboxModule
  ],
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.scss'],
})
export class AppFormsComponent implements OnInit {
  userId: string | null = null;
  userData: string = '';
  hotelId: string = '';
  federationId: string;
  hotelData: any;
  ocultarFormularioHoteles: boolean = false;
  modalTitle: string = '';
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

  formu: FormGroup;
  hotels = [
    'JW Marriott Hotel Lima',
    'Hotel Belmond Miraflores Park',
    'The Westin Lima Hotel & Convention Center',
    'Swissôtel Lima',
    'Hotel Pullman Lima San Isidro',
    'Delfines Hotel & Convention Center',
    'Radisson Hotel Decapolis Miraflores',
    'Casa Andina Premium Miraflores',
    'Hotel B',
    'Hotel Estelar Miraflores',
    'Hotel Barranco',
    'Hotel Meliá Lima',
    'Casa Andina Select Miraflores',
    'Ibis Styles Lima Conquistadores',
    'Hilton Lima Miraflores'
  ];
  federationData: any[] = [];
  selectedCountryCode: string = '';
  menuItems: any[] = []; // Propiedad para almacenar los ítems del menú dinámico
  selectedFederationId: string = ''; // ID de la federación seleccionada
  tableVisible: boolean = false; 
  tableRows: any[] = [];
  rowImages: { [key: string]: string } = {};
  blockImages: { [key: string]: string } = {};
  tripleImages: { [key: string]: string } = {};
  blockImages2: { [key: string]: string } = {};
  tripleImages2: { [key: string]: string } = {};
  tripleImages3: { [key: string]: string } = {};
  tablaFilas: any[] = [];
  flightDetails: { [key: number]: any } = {};
  flightDetailsDouble: { [key: number]: any } = {};
  flightDetailsTriple: { [key: number]: any } = {};
  contactBlocks: any[] = [];
  tableBlocks: any[] = [];
  tableDoubleRows: any[] = [];
  tableTripleRows: any[] = [];

  id: string = '';
  nombre_hotel: string = '';
  federationName: string = '';
  country: string = '';
  contactPerson: string = '';
  phoneNumber: string = '';
  emailAddress: string = '';
  mobileNumber: string = '';
  n_hotel1: string = '';
  n_hotel2: string = '';
  n_hotel3: string = '';
  hotelName: string = '';
  // Inicializa el formulario de vuelos
  flightForm: FormGroup;
  uploadedFiles: { [key: number]: File | null } = {};

  constructor(
    private http: HttpClient, 
    public navService: NavService, 
    private menuUpdateService: MenuUpdateService,
    private route: ActivatedRoute,
    private userDataService: UserDataService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    const usuarioData = this.userDataService.getUserData();
    if (usuarioData && usuarioData.id) {
      this.userId = usuarioData.id;
      console.log("DATOS DE LOGIN: ", this.userId);
      // Llamar a la función checkFederationExists solo si userId no es null
    } else {
      console.error("No se encontró el userId.");
      // Si no se encuentra un userId válido, puedes asignar un valor por defecto o manejar el error
    }
  
    // Espera a que usuarioData esté disponible antes de ejecutar los siguientes métodos
    this.initializeTableRows();
    this.initializeContactBlocks();
    this.initializeTableBlocks();
    this.initializeTripleRows();
    // Intentar obtener el ID desde el servicio compartido
    this.userDataService.userData$.subscribe((data) => {
      this.userData = data;
      console.log("USER DATA: ", this.userData);
      if (data?.data?.id) {
        // Si existe el ID en los datos del servicio, úsalo
        this.federationId = data.data.id;
      } else {
        // De lo contrario, toma el ID desde los parámetros de la URL
        this.federationId = this.route.snapshot.paramMap.get('federationId') || ''; // Usamos '' si es null
      }
  
      // Siempre intenta obtener el hotelId desde la URL
      this.hotelId = this.route.snapshot.paramMap.get('hotelId') || ''; // Usamos '' si es null
  
      console.log('Federation ID:', this.federationId);
      console.log('Hotel ID:', this.hotelId);
  
      // Llamar a los métodos de API una vez que federationId esté definido
      if (this.federationId) {
        this.fetchFederationData();
      }
      if (this.hotelId) {
        this.fetchHotelData();
      }
      this.checkFederationExists(this.federationId);
    });
  
    // Crea el formulario de vuelos con los campos necesarios
    this.flightForm = this.fb.group({
      arrival_flight_number: ['', Validators.required],
      arrival_airline: ['', Validators.required],
      arrival_date: ['', Validators.required],
      arrival_route: ['', Validators.required],
      departure_flight_number: ['', Validators.required],
      departure_airline: ['', Validators.required],
      departure_date: ['', Validators.required],
      departure_route: ['', Validators.required]
    });
    this.formu = this.fb.group({
      n_hotel1: [''],
      n_hotel2: [''],
      n_hotel3: ['']
    });
  }

  checkHotelSelection() {
    const hotel1 = this.formu.value.n_hotel1;
    const hotel2 = this.formu.value.n_hotel2;
    const hotel3 = this.formu.value.n_hotel3;
  
    // Verifica si hay algún campo que tenga el mismo hotel que otro
    if ((hotel1 && hotel2 && hotel1 === hotel2) || (hotel1 && hotel3 && hotel1 === hotel3) || (hotel2 && hotel3 && hotel2 === hotel3)) {
      Swal.fire({
        icon: 'error',
        title: '',
        text: 'You cannot select the same hotel in more than one field. Please try again.',
      });
  
      // Resetea solo el último campo que tiene el valor duplicado
      if (hotel1 === hotel2) {
        this.formu.controls['n_hotel2'].setValue('');
      } else if (hotel1 === hotel3) {
        this.formu.controls['n_hotel3'].setValue('');
      } else if (hotel2 === hotel3) {
        this.formu.controls['n_hotel3'].setValue('');
      }
  
      return;
    }
  }

  submit() {
    if (this.formu.valid && this.federationId) {
      Swal.fire({
        title: 'Do you want to save your hotel preference?',
        text: 'Once saved, you cannot modify them unless you contact the administrator. Remember that hotels are listed in order of priority.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'SAVE',
        cancelButtonText: 'CANCEL',
        width: "60%",
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
          const formData = {
            id: this.federationId,
            n_hotel1: this.formu.value.n_hotel1,
            n_hotel2: this.formu.value.n_hotel2,
            n_hotel3: this.formu.value.n_hotel3,
          };
  
          this.http.post('http://localhost:3000/api/updateFederationHotels', formData).subscribe({
            next: (response: any) => {
              console.log('Respuesta del servidor:', response);
  
              Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Successful registration',
                showConfirmButton: false,
                timer: 1500,
                toast: true,
              }).then(() => {
                this.router.navigate(['/ui-components/forms']);
              });
  
              this.formu.controls['n_hotel1'].disable();
              this.formu.controls['n_hotel2'].disable();
              this.formu.controls['n_hotel3'].disable();
              this.fetchFederationData();
  
              // Actualizar el menú después de grabar los hoteles
              this.menuUpdateService.updateNavItems([...this.menuUpdateService.getNavItems()]);
            },
            error: (error) => {
              console.error('Error al actualizar los hoteles:', error);
  
              Swal.fire({
                position: 'top-end',
                icon: 'error',
                title: 'An error occurred',
                showConfirmButton: false,
                timer: 1500,
                toast: true,
              });
            },
          });
        } else {
          console.log('El usuario canceló la operación.');
        }
      });
    } else {
      console.error('El formulario no es válido o falta el ID de la federación.');
    }
  }
  
  // Método que verifica si existen registros con el userId
  checkFederationExists(userId: any): void {
    // Verificamos que userId sea un string válido
    if (!userId) {
      console.error("UserId es inválido.");
      return;
    }
  
    this.http.get<any[]>(`http://localhost:3000/api/hoteles/${userId}`).subscribe(
      (data) => {
        if (data && data.length > 0) {
          this.tablaFilas = data;
          this.nombre_hotel = data[0].nombre_hotel;
          this.hotelName = this.nombre_hotel;
          console.log("Nombre del hotel:", this.nombre_hotel);
          this.tableVisible = true; 
        } else {
          this.tableVisible = false; 
          this.nombre_hotel = '';
          this.hotelName = '';
        }
      },
      (error) => {
        console.error('Error al obtener los datos de los hoteles:', error);
        this.tableVisible = false; 
        this.nombre_hotel = '';
        this.hotelName = '';
      }
    );
  }  
  
  async exportPDF() {
    const content = document.getElementById('pdfContent');
    if (!content) {
      console.error("No se encontró el contenido a exportar");
      return;
    }
    // Ocultar botones antes de la captura
    const elementsToHide = content.querySelectorAll('.no-print');
    elementsToHide.forEach(el => (el as HTMLElement).style.display = 'none');
    // Quitar bordes y hacer fondo transparente en inputs, selects y textareas
    const formElements = content.querySelectorAll('input, select, textarea');
    formElements.forEach(el => {
        (el as HTMLElement).style.border = '0';
        (el as HTMLElement).style.background = 'transparent';
    });
    const pdf = new jsPDF('p', 'mm', 'a4');
    let yPosition = 10; // Posición inicial en la página
    const pageHeight = 287; // Altura útil de la página A4
    const margin = 10;
    const elements = Array.from(content.children); // Obtener cada elemento dentro del div
    const processElement = async (index: number) => {
      if (index >= elements.length) {
        // Restaurar visibilidad de los botones después de la captura
        elementsToHide.forEach(el => (el as HTMLElement).style.display = '');
        pdf.save('reporte.pdf');
        return;
      }
      const element = elements[index] as HTMLElement;
      try {
        const canvas = await html2canvas(element, { scale: 1.5, useCORS: true });
        const imgData = canvas.toDataURL('image/png');
        if (!imgData || imgData === 'data:,') {
          throw new Error("Error al generar la imagen del elemento.");
        }
        const imgWidth = 190; // Margen de 10mm a cada lado
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        // Si el elemento no cabe en la página, agregar nueva página
        if (yPosition + imgHeight > pageHeight) {
          pdf.addPage();
          yPosition = margin; // Reiniciar la posición
        }
        pdf.addImage(imgData, 'PNG', margin, yPosition, imgWidth, imgHeight);
        yPosition += imgHeight + 5; // Espacio entre elementos
        await processElement(index + 1);
      } catch (error) {
        console.error('Error al procesar elemento para PDF:', error);
      }
    };
    await processElement(0);
  }  

    isFlightModalEnabled(row: any): boolean {
      return row.familyName && row.firstName ? true : false;
    }

    isFlightModalDoubleEnabled(block: any): boolean {
      return block.familyName && block.firstName ? true : false;
    }

    isFlightModalTripleEnabled(block: any): boolean {
      return block.familyName && block.firstName ? true : false;
    }

    passportValidate(): void {
      // Obtener todos los valores de los pasaportes dinámicamente
      const passportInputs = document.querySelectorAll<HTMLInputElement>("[id^='passNumber']");
      const passportNumbers = new Set<string>();
      let duplicatePassport: string | null = null;
    
      passportInputs.forEach(input => {
        const value = input.value.trim();
        if (value) {
          if (passportNumbers.has(value)) {
            duplicatePassport = value;
          } else {
            passportNumbers.add(value);
          }
        }
      });
    
      // Si hay duplicado, mostrar alerta y no abrir el modal
      if (duplicatePassport) {
        Swal.fire({
          icon: 'error',
          title: 'Número de pasaporte duplicado',
          text: `El número de pasaporte ${duplicatePassport} ya ha sido ingresado.`,
          confirmButtonText: 'Aceptar'
        });
        return;
      }
    }

    openFlightModal(row: any) {
      const flightData = this.flightDetails[row.id] || {
        arrival_flight_number: '',
        arrival_airline: '',
        arrival_date: row.dayArrival || '',
        arrival_route: '',
        departure_flight_number: '',
        departure_airline: '',
        departure_date: row.dayDeparture || '',
        departure_route: ''
      };
      Swal.fire({
        title: `Flights Detail for ${row.firstName} ${row.familyName}`,
        html: `
          <table class='table table-bordered'>
            <thead class='table-primary'>
              <tr>
                <th>Type</th><th>Flight number</th><th>Airline</th><th>Date</th><th>Route</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Arrival</td>
                <td><input id='arrival_flight_number' class='form-control' value='${flightData.arrival_flight_number}' /></td>
                <td><input id='arrival_airline' class='form-control' value='${flightData.arrival_airline}' /></td>
                <td><input id='arrival_date' class='form-control' type='datetime-local' value='${row.dayArrival}' /></td>
                <td><input id='arrival_route' class='form-control' value='${flightData.arrival_route}' /></td>
              </tr>
              <tr>
                <td>Departure</td>
                <td><input id='departure_flight_number' class='form-control' value='${flightData.departure_flight_number}' /></td>
                <td><input id='departure_airline' class='form-control' value='${flightData.departure_airline}' /></td>
                <td><input id='departure_date' class='form-control' type='datetime-local' value='${row.dayDeparture}' /></td>
                <td><input id='departure_route' class='form-control' value='${flightData.departure_route}' /></td>
              </tr>
            </tbody>
          </table>
        `,
        showCancelButton: true,
        confirmButtonText: 'Save',
        width: "80%",
      }).then((result) => {
        if (result.isConfirmed) {
          this.flightDetails[row.id] = {
            arrival_flight_number: (document.getElementById('arrival_flight_number') as HTMLInputElement).value,
            arrival_airline: (document.getElementById('arrival_airline') as HTMLInputElement).value,
            arrival_date: (document.getElementById('arrival_date') as HTMLInputElement).value,
            arrival_route: (document.getElementById('arrival_route') as HTMLInputElement).value,
            departure_flight_number: (document.getElementById('departure_flight_number') as HTMLInputElement).value,
            departure_airline: (document.getElementById('departure_airline') as HTMLInputElement).value,
            departure_date: (document.getElementById('departure_date') as HTMLInputElement).value,
            departure_route: (document.getElementById('departure_route') as HTMLInputElement).value,
          };
          console.log("detalles: ",this.flightDetails[row.id]);
          Swal.fire({
            icon: 'success',
            title: 'Flight details saved',
            showConfirmButton: false,
            timer: 2000,
            toast: true,
            position: 'top-end',
          });
        }
      });
    }    

    syncArrivalDate(index: number, value: string) {
      this.tableBlocks[index].dayArrival2 = value;
    }
    
    syncDepartureDate(index: number, value: string) {
      this.tableBlocks[index].dayDeparture2 = value;
    }

    openFlightModalDouble(blockId: number, rowIndex: number, passengerIndex: number) {
      if (rowIndex === 1) {
          this.tableBlocks[passengerIndex].familyName2 ||= this.tableBlocks[passengerIndex].familyName;
          this.tableBlocks[passengerIndex].firstName2 ||= this.tableBlocks[passengerIndex].firstName;
          this.tableBlocks[passengerIndex].passportNumber2 ||= this.tableBlocks[passengerIndex].passportNumber;
          this.tableBlocks[passengerIndex].dayArrival2 ||= this.tableBlocks[passengerIndex].dayArrival;
          this.tableBlocks[passengerIndex].dayDeparture2 ||= this.tableBlocks[passengerIndex].dayDeparture;
      }
  
      const passengerKey = `${blockId}-${rowIndex}-${passengerIndex}`;
  
      if (!this.flightDetailsDouble[blockId]) {
          this.flightDetailsDouble[blockId] = {};
      }
  
      const block = this.tableBlocks[rowIndex];
      const dayArrival = passengerIndex === 1 ? block.dayArrival : block.dayArrival2;
      const dayDeparture = passengerIndex === 1 ? block.dayDeparture : block.dayDeparture2;
  
      const existingData = this.flightDetailsDouble[blockId][passengerKey] || {};
      
      const flightData = {
          arrival_flight_number: existingData.arrival_flight_number || '',
          arrival_airline: existingData.arrival_airline || '',
          arrival_date: existingData.arrival_date || dayArrival || '',
          arrival_route: existingData.arrival_route || '',
          departure_flight_number: existingData.departure_flight_number || '',
          departure_airline: existingData.departure_airline || '',
          departure_date: existingData.departure_date || dayDeparture || '',
          departure_route: existingData.departure_route || ''
      };
  
      Swal.fire({
          title: `Flights Detail for Passenger ${passengerIndex} in Block ${blockId}`,
          html: `
            <table class='table table-bordered'>
              <thead class='table-primary'>
                <tr>
                  <th>Type</th><th>Flight number</th><th>Airline</th><th>Date</th><th>Route</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Arrival</td>
                  <td><input id='arrival_flight_number' class='form-control' value='${flightData.arrival_flight_number}' /></td>
                  <td><input id='arrival_airline' class='form-control' value='${flightData.arrival_airline}' /></td>
                  <td><input id='arrival_date' class='form-control' type='datetime-local' value='${flightData.arrival_date}' /></td>
                  <td><input id='arrival_route' class='form-control' value='${flightData.arrival_route}' /></td>
                </tr>
                <tr>
                  <td>Departure</td>
                  <td><input id='departure_flight_number' class='form-control' value='${flightData.departure_flight_number}' /></td>
                  <td><input id='departure_airline' class='form-control' value='${flightData.departure_airline}' /></td>
                  <td><input id='departure_date' class='form-control' type='datetime-local' value='${flightData.departure_date}' /></td>
                  <td><input id='departure_route' class='form-control' value='${flightData.departure_route}' /></td>
                </tr>
              </tbody>
            </table>
          `,
          showCancelButton: true,
          confirmButtonText: 'Save',
          width: "80%",
      }).then((result) => {
          if (result.isConfirmed) {
              this.flightDetailsDouble[blockId][passengerKey] = {
                  arrival_flight_number: (document.getElementById('arrival_flight_number') as HTMLInputElement).value,
                  arrival_airline: (document.getElementById('arrival_airline') as HTMLInputElement).value,
                  arrival_date: (document.getElementById('arrival_date') as HTMLInputElement).value,
                  arrival_route: (document.getElementById('arrival_route') as HTMLInputElement).value,
                  departure_flight_number: (document.getElementById('departure_flight_number') as HTMLInputElement).value,
                  departure_airline: (document.getElementById('departure_airline') as HTMLInputElement).value,
                  departure_date: (document.getElementById('departure_date') as HTMLInputElement).value,
                  departure_route: (document.getElementById('departure_route') as HTMLInputElement).value
              };
              Swal.fire({
                  icon: 'success',
                  title: 'Flight details saved',
                  showConfirmButton: false,
                  timer: 2000,
                  toast: true,
                  position: 'top-end',
              });
          }
      });
  }
  

    syncArrivalDateTriple(index: number, value: string) {
      this.tableTripleRows[index].dayArrival = value;
      this.tableTripleRows[index].dayArrival2 = value;
      this.tableTripleRows[index].dayArrival3 = value;
    }
    
    syncDepartureDateTriple(index: number, value: string) {
      this.tableTripleRows[index].dayDeparture = value;
      this.tableTripleRows[index].dayDeparture2 = value;
      this.tableTripleRows[index].dayDeparture3 = value;
    }    

    openFlightModalTriple(blockId: number, rowIndex: number, passengerIndex: number) {
      const passengerKey = `triple-${blockId}-${rowIndex}-${passengerIndex}`;
      if (!this.flightDetailsTriple) {
        this.flightDetailsTriple = {}; // Asegurar que no esté heredando datos
      }
      if (!this.flightDetailsTriple[blockId]) {
        this.flightDetailsTriple[blockId] = {};
      }
      // Obtener los valores de dayArrival y dayDeparture de la tabla
      const tripleBlock = this.tableTripleRows[rowIndex];
      const dayArrival = passengerIndex === 1 ? tripleBlock.dayArrival : tripleBlock.dayArrival2;
      const dayDeparture = passengerIndex === 1 ? tripleBlock.dayDeparture : tripleBlock.dayDeparture2;
      // Inicializar los datos correctamente
      const flightData = this.flightDetailsTriple[blockId][passengerKey] || {
        arrival_flight_number: '',
        arrival_airline: '',
        arrival_date: '',
        arrival_route: '',
        departure_flight_number: '',
        departure_airline: '',
        departure_date: '',
        departure_route: '',
        dayArrival: dayArrival || '',
        dayDeparture: dayDeparture || ''
      };
      Swal.fire({
        title: `Flights Detail for Passenger ${passengerIndex} in Block ${blockId}`,
        html: `
          <table class='table table-bordered'>
            <thead class='table-primary'>
              <tr>
                <th>Type</th><th>Flight number</th><th>Airline</th><th>Date</th><th>Route</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Arrival</td>
                <td><input id='arrival_flight_number' class='form-control' value='${flightData.arrival_flight_number}' /></td>
                <td><input id='arrival_airline' class='form-control' value='${flightData.arrival_airline}' /></td>
                <td><input id='arrival_date' class='form-control' type='datetime-local' value='${flightData.dayArrival}' /></td>
                <td><input id='arrival_route' class='form-control' value='${flightData.arrival_route}' /></td>
              </tr>
              <tr>
                <td>Departure</td>
                <td><input id='departure_flight_number' class='form-control' value='${flightData.departure_flight_number}' /></td>
                <td><input id='departure_airline' class='form-control' value='${flightData.departure_airline}' /></td>
                <td><input id='departure_date' class='form-control' type='datetime-local' value='${flightData.dayDeparture}' /></td>
                <td><input id='departure_route' class='form-control' value='${flightData.departure_route}' /></td>
              </tr>
            </tbody>
          </table>
        `,
        showCancelButton: true,
        confirmButtonText: 'Save',
        width: "80%",
      }).then((result) => {
        if (result.isConfirmed) {
          // Obtener los valores de los campos
          const arrivalFlightNumber = (document.getElementById('arrival_flight_number') as HTMLInputElement).value;
          const arrivalAirline = (document.getElementById('arrival_airline') as HTMLInputElement).value;
          const arrivalDate = (document.getElementById('arrival_date') as HTMLInputElement).value;
          const arrivalRoute = (document.getElementById('arrival_route') as HTMLInputElement).value;
          const departureFlightNumber = (document.getElementById('departure_flight_number') as HTMLInputElement).value;
          const departureAirline = (document.getElementById('departure_airline') as HTMLInputElement).value;
          const departureDate = (document.getElementById('departure_date') as HTMLInputElement).value;
          const departureRoute = (document.getElementById('departure_route') as HTMLInputElement).value;
    
          // Validación: Verificar que los campos obligatorios no estén vacíos
          if (!arrivalFlightNumber || !arrivalAirline || !arrivalDate || !arrivalRoute || !departureFlightNumber || !departureAirline || !departureDate || !departureRoute) {
            Swal.fire({
              icon: 'error',
              title: 'Validation Error',
              text: 'All fields are required.',
            });
            return; // Si hay campos vacíos, no guardamos los datos
          }
    
          // Guardar los detalles de vuelo para el pasajero en el bloque específico (solo en triple)
          this.flightDetailsTriple[blockId][passengerKey] = {
            arrival_flight_number: arrivalFlightNumber,
            arrival_airline: arrivalAirline,
            arrival_date: arrivalDate,
            arrival_route: arrivalRoute,
            departure_flight_number: departureFlightNumber,
            departure_airline: departureAirline,
            departure_date: departureDate,
            departure_route: departureRoute,
            dayArrival: arrivalDate,
            dayDeparture: departureDate,
          };
    
          Swal.fire({
            icon: 'success',
            title: 'Flight details saved',
            showConfirmButton: false,
            timer: 2000,
            toast: true,
            position: 'top-end',
          });
        }
      });
    }


  fetchFederationData(): void {
    if (this.federationId) {
      this.http
        .get<any>(`http://localhost:3000/api/getFederationData/${this.federationId}`)
        .subscribe(
          (data) => {
            this.federationData = data;
            console.log('Datos de la federación obtenidos:', data);
            this.federationName = data.n_federacion;
            this.contactPerson = data.c_person;
            this.phoneNumber = data.p_number;
            this.emailAddress = data.email_address;
            this.mobileNumber = data.mobile_number;
            
            // Asignar valores al formulario
            this.formu.patchValue({
              n_hotel1: data.n_hotel1,
              n_hotel2: data.n_hotel2,
              n_hotel3: data.n_hotel3
            });
  
            // Ocultar el formulario si ya hay hoteles seleccionados
            this.ocultarFormularioHoteles = !!(data.n_hotel1 || data.n_hotel2 || data.n_hotel3);
  
            // Deshabilitar los selects si alguna opción tiene un valor distinto de vacío
            if (this.ocultarFormularioHoteles) {
              this.formu.controls['n_hotel1'].disable();
              this.formu.controls['n_hotel2'].disable();
              this.formu.controls['n_hotel3'].disable();
            }
  
            // Buscar el nombre del país
            const countryObj = this.countries.find(country => country.code === data.n_country);
            this.country = countryObj ? countryObj.name : 'Desconocido';
          },
          (error) => {
            console.error('Error al obtener datos de la federación', error);
          }
        );
    } else {
      console.error('El ID de la federación es obligatorio.');
    }
  }       

  fetchHotelData(): void {
    if (this.federationId && this.hotelId) {
      this.http
        .get<any>(`http://localhost:3000/api/hotel/${this.federationId}/${this.hotelId}`)
        .subscribe(
          (data) => {
            this.hotelData = data;
            this.hotelName = data.nombre_hotel
            console.log('Datos del hotel obtenidos:', data);
          },
          (error) => {
            console.error('Error al obtener datos del hotel', error);
          }
        );
    } else {
      console.error('El ID de la federación y del hotel son obligatorios.');
    }
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
  
        if (this.hotelName && this.hotelName.trim() !== '') {
          const hotelData = {
            nombre_hotel: this.hotelName.trim(),
            federacion_id: this.id,
            f_registro: new Date().toISOString().slice(0, 19).replace('T', ' '),
          };
  
          this.http.post('http://localhost:3000/api/checkAndUpdateHotel', hotelData).subscribe(
            (checkResponse: any) => { // Usamos 'any' para permitir cualquier tipo de respuesta
              const hotelId = checkResponse.id; // Obtener el id del hotel desde la respuesta
  
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
                      (updateResponse: any) => { // Usamos 'any' para permitir cualquier tipo de respuesta
                        const updatedHotelId = updateResponse.id; // Obtener el id de la respuesta de la actualización
  
                        console.log('Hotel actualizado:', updateResponse);
                        Swal.fire({
                          icon: 'success',
                          title: 'Hotel actualizado',
                          showConfirmButton: false,
                          timer: 2000,
                          toast: true,
                          position: 'top-end',
                        });
  
                        // Actualiza el menú con el nuevo hotel usando el id de la respuesta de actualización
                        this.menuUpdateService.addNavItem({
                          displayName: this.hotelName.trim(),
                          route: `/ui-components/forms/${updatedHotelId}`, // Usar el id correcto aquí
                          iconName: 'hotel',
                        }, 'Hotels');
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
                  (hotelResponse: any) => { // Usamos 'any' para permitir cualquier tipo de respuesta
                    const registeredHotelId = hotelResponse.id; // Obtener el id del hotel registrado
  
                    console.log('Hotel registrado correctamente:', hotelResponse);
                    Swal.fire({
                      icon: 'success',
                      title: 'Federación y hotel actualizados',
                      showConfirmButton: false,
                      timer: 2000,
                      toast: true,
                      position: 'top-end',
                    });
  
                    // Actualiza el menú con el nuevo hotel usando el id de la respuesta de registro
                    this.menuUpdateService.addNavItem({
                      displayName: this.hotelName.trim(),
                      route: `/ui-components/forms/${registeredHotelId}`, // Usar el id correcto aquí
                      iconName: 'hotel',
                    }, 'Hotels');
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

  updateMenuItems(federationId: string): void {
    // Llamar al servicio para obtener los ítems del menú en base al federationId
    this.navService.getHotelsByFederation(federationId).subscribe(
      (data) => {
        this.menuItems = data.map((item) => ({
          displayName: item.name,
          route: `/ui-components/forms/${item.id}`,
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
    this.tableRows = [{
      id: 1,
      familyName: '',
      firstName: '',
      passportNumber: '',
      dayArrival: '',
      dayDeparture: '',
      tipo_habitacion: 'S'
    }];
    this.flightDetails[1] = this.initializeFlightDetails();
    this.uploadedFiles[1] = null;
  }

  addRow(): void {
    const newId = this.tableRows.length + 1;
    const newRow = {
      id: newId,
      familyName: '',
      firstName: '',
      passportNumber: '',
      dayArrival: '',
      dayDeparture: '',
      tipo_habitacion: 'S'
    };
    this.tableRows.push(newRow);
    this.flightDetails[newId] = this.initializeFlightDetails();
    this.uploadedFiles[newId] = null;
  }

  removeRow(index: number): void {
    if (index > -1 && index < this.tableRows.length) {
      const removedId = this.tableRows[index].id;
      this.tableRows.splice(index, 1);
      delete this.flightDetails[removedId];
      delete this.uploadedFiles[removedId];
    }
  }

  openFileSelector(rowId: number): void {
    const fileInput = document.getElementById(`fileInput${rowId}`) as HTMLInputElement;
    if (fileInput) {
      fileInput.click();
    }
  }

  onFileSelected(event: any, rowId: string): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        // Almacenamos la imagen como una URL de datos en base64
        this.rowImages[rowId] = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  // Método para visualizar la imagen en un modal
  openImageModal(rowId: string, passportNumber: string): void {
    const imageUrl = this.rowImages[rowId];
    if (imageUrl) {
      Swal.fire({
        title: `Passport Number ${passportNumber}`,
        html: `<img src="${imageUrl}" style="max-width: 100%; max-height: 400px;" />`,
        showCloseButton: true,
        width: '50%',
      });
    } else {
      Swal.fire('No image selected', '', 'warning');
    }
  }

  // Método para abrir el selector de archivos para un bloque
  openFileSelectorDouble(blockId: number): void {
    const fileInputDouble = document.getElementById(`fileInputDouble${blockId}`) as HTMLInputElement;
    if (fileInputDouble) {
      fileInputDouble.click();
    }
  }

  // Método para manejar la selección de archivos y almacenar la imagen en base64
  onFileSelectedDouble(event: any, blockId: number): void {
    const fileDouble = event.target.files[0];
    if (fileDouble) {
      const readerDouble = new FileReader();
      readerDouble.onload = (e: any) => {
        // Almacenamos la imagen en el bloque correspondiente
        this.blockImages[blockId] = e.target.result;
      };
      readerDouble.readAsDataURL(fileDouble);
    }
  }

  // Método para mostrar la imagen en un modal
  openImageModalDouble(blockId: number, passportNumber: string): void {
    const imageUrlDouble = this.blockImages[blockId];
    if (imageUrlDouble) {
      Swal.fire({
        title: `Passport Number ${passportNumber}`,
        html: `<img src="${imageUrlDouble}" style="max-width: 100%; max-height: 400px;" />`,
        showCloseButton: true,
        width: '50%',
      });
    } else {
      Swal.fire('No image selected', '', 'warning');
    }
  }

  openFileSelectorDouble2(blockId: number): void {
    const fileInputDouble2 = document.getElementById(`fileInputDouble2${blockId}`) as HTMLInputElement;
    if (fileInputDouble2) {
      fileInputDouble2.click();
    }
  }

  // Método para manejar la selección de archivos y almacenar la imagen en base64
  onFileSelectedDouble2(event: any, blockId: number): void {
    const fileDouble2 = event.target.files[0];
    if (fileDouble2) {
      const readerDouble2 = new FileReader();
      readerDouble2.onload = (e: any) => {
        // Almacenamos la imagen en el bloque correspondiente
        this.blockImages2[blockId] = e.target.result;
      };
      readerDouble2.readAsDataURL(fileDouble2);
    }
  }

  // Método para mostrar la imagen en un modal
  openImageModalDouble2(blockId: number, passportNumber: string): void {
    const imageUrlDouble2 = this.blockImages2[blockId];
    if (imageUrlDouble2) {
      Swal.fire({
        title: `Passport Number ${passportNumber}`,
        html: `<img src="${imageUrlDouble2}" style="max-width: 100%; max-height: 400px;" />`,
        showCloseButton: true,
        width: '50%',
      });
    } else {
      Swal.fire('No image selected', '', 'warning');
    }
  }

  // Método para abrir el selector de archivos para un bloque
  openFileSelectorTriple(blockId: number): void {
    const fileInputTriple = document.getElementById(`fileInputTriple${blockId}`) as HTMLInputElement;
    if (fileInputTriple) {
      fileInputTriple.click();
    }
  }

  // Método para manejar la selección de archivos y almacenar la imagen en base64
  onFileSelectedTriple(event: any, blockId: number): void {
    const fileTriple = event.target.files[0];
    if (fileTriple) {
      const readerTriple = new FileReader();
      readerTriple.onload = (e: any) => {
        // Almacenamos la imagen en el bloque correspondiente
        this.tripleImages[blockId] = e.target.result;
      };
      readerTriple.readAsDataURL(fileTriple);
    }
  }

  // Método para mostrar la imagen en un modal
  openImageModalTriple(blockId: number, passportNumber: string): void {
    const imageUrlTriple = this.tripleImages[blockId];
    if (imageUrlTriple) {
      Swal.fire({
        title: `Passport Number ${passportNumber}`,
        html: `<img src="${imageUrlTriple}" style="max-width: 100%; max-height: 400px;" />`,
        showCloseButton: true,
        width: '50%',
      });
    } else {
      Swal.fire('No image selected', '', 'warning');
    }
  }

  openFileSelectorTriple2(blockId: number): void {
    const fileInputTriple2 = document.getElementById(`fileInputTriple2${blockId}`) as HTMLInputElement;
    if (fileInputTriple2) {
      fileInputTriple2.click();
    }
  }

  // Método para manejar la selección de archivos y almacenar la imagen en base64
  onFileSelectedTriple2(event: any, blockId: number): void {
    const fileTriple2 = event.target.files[0];
    if (fileTriple2) {
      const readerTriple2 = new FileReader();
      readerTriple2.onload = (e: any) => {
        // Almacenamos la imagen en el bloque correspondiente
        this.tripleImages2[blockId] = e.target.result;
      };
      readerTriple2.readAsDataURL(fileTriple2);
    }
  }

  // Método para mostrar la imagen en un modal
  openImageModalTriple2(blockId: number, passportNumber: string): void {
    const imageUrlTriple2 = this.tripleImages2[blockId];
    if (imageUrlTriple2) {
      Swal.fire({
        title: `Passport Number ${passportNumber}`,
        html: `<img src="${imageUrlTriple2}" style="max-width: 100%; max-height: 400px;" />`,
        showCloseButton: true,
        width: '50%',
      });
    } else {
      Swal.fire('No image selected', '', 'warning');
    }
  }

  openFileSelectorTriple3(blockId: number): void {
    const fileInputTriple3 = document.getElementById(`fileInputTriple3${blockId}`) as HTMLInputElement;
    if (fileInputTriple3) {
      fileInputTriple3.click();
    }
  }

  // Método para manejar la selección de archivos y almacenar la imagen en base64
  onFileSelectedTriple3(event: any, blockId: number): void {
    const fileTriple3 = event.target.files[0];
    if (fileTriple3) {
      const readerTriple3 = new FileReader();
      readerTriple3.onload = (e: any) => {
        // Almacenamos la imagen en el bloque correspondiente
        this.tripleImages3[blockId] = e.target.result;
      };
      readerTriple3.readAsDataURL(fileTriple3);
    }
  }

  // Método para mostrar la imagen en un modal
  openImageModalTriple3(blockId: number, passportNumber: string): void {
    const imageUrlTriple3 = this.tripleImages3[blockId];
    if (imageUrlTriple3) {
      Swal.fire({
        title: `Passport Number ${passportNumber}`,
        html: `<img src="${imageUrlTriple3}" style="max-width: 100%; max-height: 400px;" />`,
        showCloseButton: true,
        width: '50%',
      });
    } else {
      Swal.fire('No image selected', '', 'warning');
    }
  }

  initializeFlightDetails() {
    return {
      arrival_flight_number: '',
      arrival_airline: '',
      arrival_date: '',
      arrival_route: '',
      departure_flight_number: '',
      departure_airline: '',
      departure_date: '',
      departure_route: '',
      flightNumber: '', 
      departureTime: ''
    };
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


  initializeTableBlocks(): void {
    this.tableBlocks = [
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
      },
    ];
  }

addBlock(): void {
  const newBlock = {
    id: this.tableBlocks.length + 1,
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
  this.tableBlocks.push(newBlock);
}

removeBlock(index: number): void {
  if (index > -1 && index < this.tableBlocks.length) {
    this.tableBlocks.splice(index, 1);
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
