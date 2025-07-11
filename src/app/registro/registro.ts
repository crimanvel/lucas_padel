import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './registro.html',
  styleUrls: ['./registro.css']
})



export class RegistroComponent {
  registerForm: FormGroup;
  userCreated = false;

  @Output() volverAlLogin = new EventEmitter<void>();

  constructor(private fb: FormBuilder) {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]]
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      const { email, password } = this.registerForm.value;
      console.log('Usuario creado:', { email, password });
      this.userCreated = true;
      this.registerForm.reset();
    } else {
      this.registerForm.markAllAsTouched();
    }
  }

  volver() {
    this.volverAlLogin.emit();
  }
}
