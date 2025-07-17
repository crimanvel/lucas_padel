import { Injectable } from '@angular/core';

export interface Club {
  nombre: string;
  direccion: string;
  horarios: string[];
}

const STORAGE_KEY = 'clubes_padel';

@Injectable({
  providedIn: 'root'
})
export class TurnosService {
  private clubes: Club[] = [
    {
      nombre: 'Club Padel Norte',
      direccion: 'Av. Slempreviva 742',
      horarios: ['10:00', '11:00', '12:00']
    },
    {
      nombre: 'Pádel Center',
      direccion: 'Calle Falsa 123',
      horarios: ['9:00', '10:00', '11:00']
    },
    {
      nombre: 'Canchas Los Álamos',
      direccion: 'Av. Los Rosales 543',
      horarios: ['14:00', '15:00', '16:00']
    }
  ];

  constructor() {
    this.cargarClubes();
  }

  private cargarClubes() {
    const data = localStorage.getItem(STORAGE_KEY);
    if (data) {
      this.clubes = JSON.parse(data);
    }
  }

  private guardarClubes() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(this.clubes));
  }

  getClubes(): Club[] {
    return this.clubes;
  }

  reservarTurno(nombreClub: string, hora: string): boolean {
    const club = this.clubes.find(c => c.nombre === nombreClub);
    if (club) {
      const index = club.horarios.indexOf(hora);
      if (index !== -1) {
        club.horarios.splice(index, 1); // Elimina el horario reservado
        this.guardarClubes();
        return true;
      }
    }
    return false;
  }
}