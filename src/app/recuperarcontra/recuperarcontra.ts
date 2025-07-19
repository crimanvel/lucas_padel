import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recuperarcontra',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './recuperarcontra.html',
  styleUrls: ['./recuperarcontra.css'],
})
export class RecuperarcontraComponent {
  form: FormGroup;
  enviado = false;

  constructor(private fb: FormBuilder, private router: Router) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  recuperar() {
    if (this.form.valid) {
      const email = this.form.value.email;
      console.log('Solicitud enviada a:', email);
      this.enviado = true;
      this.form.reset();
    } else {
      this.form.markAllAsTouched();
    }
  }

  volver() {
    console.log('volver al login desde recuperar');
    this.router.navigate(['/login']);
  }

  
}
