import { Component } from '@angular/core';
import { CircleAlert, CircleCheck, LucideAngularModule, X } from 'lucide-angular';
import { FlashMessageService } from '../../../core/services/flash-message.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-flash-message-component',
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './flash-message-component.html',
  styles: [
    `
      @keyframes slide-in {
        0% {
          opacity: 0;
          transform: translateY(-10px) translateX(10px);
        }
        100% {
          opacity: 1;
          transform: translateY(0) translateX(0);
        }
      }

      .animate-slide-in {
        animation: slide-in 0.3s ease-out;
      }
    `
  ]
})
export class FlashMessageComponent {
  X = X;
  AlertCircle = CircleAlert;
  CheckCircle = CircleCheck;

  constructor(public flash: FlashMessageService) { }

  close(): void {
    this.flash.hide();
  }
}
