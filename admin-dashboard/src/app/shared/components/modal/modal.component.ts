import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, X } from 'lucide-angular';

@Component({
    selector: 'app-modal',
    standalone: true,
    imports: [CommonModule, LucideAngularModule],
    templateUrl: './modal.component.html',
})

export class ModalComponent {
    @Input() isOpen = false;
    @Input() title = '';
    @Input() width = 'max-w-xl';
    @Output() close = new EventEmitter<void>();

    readonly X = X;

    closeModal() {
        this.close.emit();
    }
}
