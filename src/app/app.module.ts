import { bootstrapApplication } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common'; // Importa CommonModule
import { AppComponent } from './app.component';

bootstrapApplication(AppComponent, {
  providers: [
    RouterModule,
    CommonModule  // Asegúrate de agregar CommonModule para usar directivas como *ngIf
  ]
}).catch(err => console.error(err));
