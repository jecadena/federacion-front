import { bootstrapApplication } from '@angular/platform-browser';
import { provideClientHydration } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, {
  providers: [
    provideClientHydration(), // Habilita la hidratación en el cliente
    ...appConfig.providers,
  ],
}).catch((err) => console.error(err));
