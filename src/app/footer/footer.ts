import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  template: `
    <footer class="footer">
      © 2025 Reservos Padel - Todos los derechos reservados
    </footer>
  `,
  styleUrls: ['./footer.css']
})
export class FooterComponent {}
