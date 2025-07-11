import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-recuperarcontra',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './recuperarcontra.html',
  styleUrls: ['./recuperarcontra.css']
})
export class RecuperarcontraComponent {
  form: FormGroup;
  enviado = false;

  @Output() volverAlLogin = new EventEmitter<void>();

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
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
    this.volverAlLogin.emit();
  }
}
