import { Component } from '@angular/core';
import { ArrowLeft, LucideAngularModule, ShieldAlert } from 'lucide-angular';

@Component({
  selector: 'app-unauthorized-component',
  imports: [LucideAngularModule],
  templateUrl: './unauthorized-component.html',
  styles: [
    `
      @keyframes fade-in {
        from {
          opacity: 0;
          transform: translateY(12px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }

      .animate-fade-in {
        animation: fade-in 0.6s ease-out;
      }
    `
  ],
})
export class UnauthorizedComponent {
  readonly ShieldAlert = ShieldAlert;
  readonly ArrowLeft = ArrowLeft;
}
