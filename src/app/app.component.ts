import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatCardModule } from '@angular/material/card'; // Importa MatCardModule
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input'; // Si usas matInput
import { MatButtonModule } from '@angular/material/button'; // Para los botones mat-flat-button

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    MatCardModule, // Asegúrate de agregar MatCardModule
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = '';
}
