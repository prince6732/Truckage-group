import { Component, output, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, Trash2, Info, TriangleAlert } from 'lucide-angular';

@Component({
  selector: 'app-confirmation-modal',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './confirmation-modal.component.html',
})
export class ConfirmationModalComponent {
  isOpen = input<boolean>(false);
  title = input<string>('Confirm Action');
  message = input<string>('Are you sure you want to proceed?');
  type = input<'danger' | 'warning' | 'info'>('danger');
  confirmText = input<string>('Confirm');
  cancelText = input<string>('Cancel');
  confirmed = output<void>();
  cancelled = output<void>();

  readonly Trash2Icon = Trash2;
  readonly AlertTriangleIcon = TriangleAlert;
  readonly InfoIcon = Info;

  onConfirm() {
    this.confirmed.emit();
  }

  onCancel() {
    this.cancelled.emit();
  }
}
