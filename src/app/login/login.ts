import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  invalidCredentials = false;

  constructor(private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(4)]]
    });
  }

  @Output() mostrarRegistro = new EventEmitter<void>();
  @Output() mostrarRecuperar = new EventEmitter<void>();


  onSubmit() {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;
      if (username === 'admin' && password === '1234') {
        this.invalidCredentials = false;
        alert('¡Bienvenido!');
      } else {
        this.invalidCredentials = true;
      }
    } else {
      this.loginForm.markAllAsTouched(); 
    }
  }
}
