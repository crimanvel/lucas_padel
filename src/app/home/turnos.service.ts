import { Injectable } from '@angular/core';

export interface Club {
  nombre: string;
  direccion: string; 
  horarios: string[];
  reservas: { [hora: string]: boolean }; 
}

const STORAGE_KEY = 'clubes_padel';

@Injectable({
  providedIn: 'root',
})
export class TurnosService {
  private clubes: Club[] = [
    {
      nombre: 'Club Padel Norte',
      direccion: 'Av. Norte 123',
      horarios: ['10:00', '11:00', '12:00'],
      reservas: {
        '10:00': false,
        '11:00': false,
        '12:00': false,
      },
    },
    {
      nombre: 'Pádel Center',
      direccion: 'Avenida Siempre Viva 742',
      horarios: ['9:00', '10:00', '11:00'],
      reservas: {
        '9:00': false,
        '10:00': false,
        '11:00': false,
      },
    },
    {
      nombre: 'Canchas Los Álamos',
      direccion: 'Paseo de la Reforma 456',
      horarios: ['14:00', '15:00', '16:00'],
      reservas: {
        '14:00': false,
        '15:00': false,
        '16:00': false,
      },
    },
    {
      nombre: 'Instituto',
      direccion: 'Boulevard de los Insurgentes 789',
      horarios: ['10:00', '11:00', '12:00'],
      reservas: {
        '10:00': false,
        '11:00': false,
        '12:00': false,
      },
    },
    {
      nombre: 'Pádel House',
      direccion: 'Calle de la Amargura 321',
      horarios: ['9:00', '10:00', '11:00'],
      reservas: {
        '9:00': false,
        '10:00': false,
        '11:00': false,
      },
    },
    {
      nombre: 'Canchas Talleres',
      direccion: 'Avenida de la Paz 654',
      horarios: ['14:00', '15:00', '16:00'],
      reservas: {
        '14:00': false,
        '15:00': false,
        '16:00': false,
      },
    },
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

  reservarTurno(nombreClub: string, hora: string): boolean {
    const club = this.clubes.find((c) => c.nombre === nombreClub);
    if (club) {
      const index = club.horarios.indexOf(hora);
      if (index !== -1) {
        club.horarios.splice(index, 1);
        this.guardarClubes();
        return true;
      }
    }
    return false;
  }

  agregarTurno(clubNombre: string, hora: string) {
    const club = this.clubes.find((c) => c.nombre === clubNombre);
    if (club && !club.horarios.includes(hora)) {
      club.horarios.push(hora);
      club.reservas[hora] = false;
    }
  }

  eliminarTurno(clubNombre: string, hora: string) {
    const club = this.clubes.find((c) => c.nombre === clubNombre);
    if (club) {
      club.horarios = club.horarios.filter((h) => h !== hora);
      delete club.reservas[hora];
    }
  }

  modificarTurno(clubNombre: string, horaVieja: string, horaNueva: string) {
    const club = this.clubes.find((c) => c.nombre === clubNombre);
    if (
      club &&
      club.horarios.includes(horaVieja) &&
      !club.horarios.includes(horaNueva)
    ) {
      club.horarios = club.horarios.map((h) =>
        h === horaVieja ? horaNueva : h
      );
      club.reservas[horaNueva] = club.reservas[horaVieja];
      delete club.reservas[horaVieja];
    }
  }

  agregarClub(nombre: string, direccion: string) {
    if (!this.clubes.find((c) => c.nombre === nombre)) {
      this.clubes.push({
        nombre,
        direccion,
        horarios: [],
        reservas: {},
      });
    }
  }

  editarClub(nombreViejo: string, nombreNuevo: string, direccion: string) {
    const club = this.clubes.find((c) => c.nombre === nombreViejo);
    if (club) {
      club.nombre = nombreNuevo;
      club.direccion = direccion;
    }
  }

  eliminarClub(nombre: string) {
    this.clubes = this.clubes.filter((c) => c.nombre !== nombre);
  }

  getClubes(): Club[] {
    return this.clubes;
  }
}
