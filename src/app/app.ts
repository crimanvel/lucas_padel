import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login';
import { RegistroComponent } from './registro/registro';
import { RecuperarcontraComponent } from './recuperarcontra/recuperarcontra';
import { FooterComponent } from './footer/footer';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    LoginComponent,
    RegistroComponent,
    RecuperarcontraComponent,
    FooterComponent
  ],
  template: `
    
  <app-login *ngIf="vista === 'login'"
             (mostrarRegistro)="vista = 'registro'"
             (mostrarRecuperar)="vista = 'recuperar'">
  </app-login>

  <app-registro *ngIf="vista === 'registro'"
                (volverAlLogin)="vista = 'login'">
  </app-registro>

  <app-recuperarcontra *ngIf="vista === 'recuperar'"
                       (volverAlLogin)="vista = 'login'">
  </app-recuperarcontra>

  <app-footer />
`
})
export class App {
  vista: 'login' | 'registro' | 'recuperar' = 'login';
}
