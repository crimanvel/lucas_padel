import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login';
import { RegistroComponent } from './registro/registro';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, LoginComponent, RegistroComponent],
  template: `
    <app-login
      *ngIf="!mostrarRegistro"
      (mostrarRegistro)="toggleRegistro(true)">
    </app-login>

    <app-registro
      *ngIf="mostrarRegistro"
      (volverAlLogin)="toggleRegistro(false)">
    </app-registro>
  `
})
export class App {
  mostrarRegistro = false;

  toggleRegistro(valor: boolean) {
    this.mostrarRegistro = valor;
  }
}
