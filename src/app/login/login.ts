import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
})

export class LoginComponent {
  loginForm: FormGroup;
  invalidCredentials = false;
  
  constructor(private fb: FormBuilder, private router: Router) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(4)]],
    });
  }
  onSubmit(): void {
    console.log('onSubmit called', this.loginForm.value);
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;
      if (username === 'jugador' && password === '1234') {
        this.invalidCredentials = false;
        localStorage.setItem('isLoggedIn', 'true');
        alert('¡Bienvenido!');
        this.router.navigate(['/home']);
      } else {
        this.invalidCredentials = true;
        localStorage.removeItem('isLoggedIn');
      }
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
  irARegistro(): void {
    console.log('irARegistro called');
    this.router.navigate(['/registro']);
  }
  irARecuperar(): void {
    console.log('irARecuperar called');
    this.router.navigate(['/recuperar']);
  }
}
