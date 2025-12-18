import { Component, EventEmitter, Input, Output } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { Templates } from '../../../../shared/models/interface';
import { ModalComponent } from '../../../../shared/components/modal/modal.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-templates-details-component',
  imports: [CommonModule, ModalComponent],
  templateUrl: './templates-details-component.html',
})

export class TemplatesDetailsComponent {
  @Input() isOpen!: boolean;
  @Input() item!: Templates | null;
  @Output() close = new EventEmitter<void>();

  imageUrl = environment.imageUrl;
}
