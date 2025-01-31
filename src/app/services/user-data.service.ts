import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserDataService {
  private userDataSubject = new BehaviorSubject<any>(this.getStoredUserData()); // Inicializa con datos almacenados en localStorage
  userData$ = this.userDataSubject.asObservable(); // Observable para suscribirse a los datos

  // Almacena datos del usuario en BehaviorSubject y localStorage
  setUserData(data: any): void {
    this.userDataSubject.next(data); // Actualiza el observable
    localStorage.setItem('userData', JSON.stringify(data)); // Persiste los datos
  }

  // Obtiene los datos del usuario desde el BehaviorSubject o localStorage
  getUserData(): any {
    return this.userDataSubject.value || this.getStoredUserData();
  }

  // Limpia los datos del usuario (útil para logout)
  clearUserData(): void {
    this.userDataSubject.next(null); // Resetea el observable
    localStorage.removeItem('userData'); // Elimina del almacenamiento
  }

  // Método interno para obtener datos almacenados en localStorage
  getStoredUserData(): any {
    const data = localStorage.getItem('userData');
    console.log("DATA LOCALSTORAGE: ", data);
    return data ? JSON.parse(data) : null;
  }
}
