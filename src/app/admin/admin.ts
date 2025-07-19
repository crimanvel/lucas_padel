import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './admin.html',
  styleUrls: ['./admin.css'],
})
export class Admin {
  usuarioEditandoIndex: number | null = null;

  usuarioForm: FormGroup;
  usuarios: any[] = [
    { nombre: 'Juan Pérez', email: 'juan@example.com', rol: 'Usuario' },
    { nombre: 'Ana Gómez', email: 'ana@example.com', rol: 'Administrador' },
  ];

  constructor(private fb: FormBuilder) {
    this.usuarioForm = this.fb.group({
      nombre: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      rol: ['', Validators.required],
    });
  }

  guardar() {
    if (this.usuarioForm.valid) {
      const nuevoUsuario = this.usuarioForm.value;

      if (this.usuarioEditandoIndex !== null) {
        this.usuarios[this.usuarioEditandoIndex] = nuevoUsuario;
        this.usuarioEditandoIndex = null;
      } else {
        this.usuarios.push(nuevoUsuario);
      }

      this.usuarioForm.reset();
    }
  }

  editar(usuario: any, index: number) {
    this.usuarioForm.setValue({
      nombre: usuario.nombre,
      email: usuario.email,
      rol: usuario.rol,
    });
    this.usuarioEditandoIndex = index;
  }

  eliminar(usuario: any) {
    this.usuarios = this.usuarios.filter((u) => u !== usuario);
  }
}