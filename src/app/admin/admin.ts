import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { TurnosService, Club } from '../home/turnos.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './admin.html',
  styleUrls: ['./admin.css'],
})
export class Admin {
  seccion: 'usuarios' | 'clubes' | 'turnos' = 'usuarios';

  usuarios: any[] = [
    { nombre: 'Juan Pérez', email: 'juan@example.com', rol: 'Usuario' },
    { nombre: 'Ana Gómez', email: 'ana@example.com', rol: 'Administrador' },
  ];
  usuarioForm: FormGroup;
  usuarioEditandoIndex: number | null = null;
  clubForm: FormGroup;
  clubEditando: Club | null = null;
  clubes: Club[] = [];
  turnoForm: FormGroup;
  turnoEditando: { club: Club; hora: string } | null = null;

  constructor(
    private fb: FormBuilder,
    private turnosService: TurnosService,
    private router: Router
  ) {

    this.usuarioForm = this.fb.group({
      nombre: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      rol: ['', Validators.required],
    });

    this.clubForm = this.fb.group({
      nombre: ['', Validators.required],
      direccion: ['', Validators.required],
    });

    this.turnoForm = this.fb.group({
      club: ['', Validators.required],
      hora: ['', Validators.required],
      horaNueva: [''],
    });

    this.actualizarClubes();
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

  actualizarClubes() {
    this.clubes = this.turnosService.getClubes();
  }

  agregarClub() {
    if (this.clubForm.valid) {
      const { nombre, direccion } = this.clubForm.value;
      this.turnosService.agregarClub(nombre, direccion);
      this.clubForm.reset();
      this.actualizarClubes();
    }
  }

  editarClub(club: Club) {
    this.clubEditando = club;
    this.clubForm.patchValue({
      nombre: club.nombre,
      direccion: club.direccion,
    });
  }

  guardarEdicionClub() {
    if (this.clubEditando && this.clubForm.valid) {
      const { nombre, direccion } = this.clubForm.value;
      this.turnosService.editarClub(
        this.clubEditando.nombre,
        nombre,
        direccion
      );
      this.clubEditando = null;
      this.clubForm.reset();
      this.actualizarClubes();
    }
  }

  eliminarClub(club: Club) {
    this.turnosService.eliminarClub(club.nombre);
    this.actualizarClubes();
  }
  agregarTurno() {
    if (this.turnoForm.valid) {
      this.turnosService.agregarTurno(
        this.turnoForm.value.club,
        this.turnoForm.value.hora
      );
      this.turnoForm.reset();
      this.actualizarClubes();
    }
  }

  editarTurno(club: Club, hora: string) {
    this.turnoEditando = { club, hora };
    this.turnoForm.patchValue({
      club: club.nombre,
      hora: hora,
      horaNueva: hora,
    });
  }

  guardarEdicionTurno() {
    if (this.turnoEditando && this.turnoForm.value.horaNueva) {
      this.turnosService.modificarTurno(
        this.turnoEditando.club.nombre,
        this.turnoEditando.hora,
        this.turnoForm.value.horaNueva
      );
      this.turnoEditando = null;
      this.turnoForm.reset();
      this.actualizarClubes();
    }
  }

  eliminarTurno(club: Club, hora: string) {
    this.turnosService.eliminarTurno(club.nombre, hora);
    this.actualizarClubes();
  }

  cerrarSesion() {
    localStorage.removeItem('logueado');
    sessionStorage.setItem('logout', 'true');
    this.router.navigate(['/login']);
  }
}
