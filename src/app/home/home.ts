import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { TurnosService, Club } from './turnos.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class HomeComponent {
  clubes: Club[] = [];

  constructor(private router: Router, private turnosService: TurnosService) {
    this.clubes = this.turnosService.getClubes();
  }

  reservar(club: string, hora: string) {
    const reservado = this.turnosService.reservarTurno(club, hora);
    if (reservado) {
      alert(`Turno reservado en ${club} a las ${hora}`);
    } else {
      alert('No se pudo reservar el turno.');
    }
  }

  cerrarSesion() {
    localStorage.removeItem('logueado');
    sessionStorage.setItem('logout', 'true');
    this.router.navigate(['/login']);
  }
}