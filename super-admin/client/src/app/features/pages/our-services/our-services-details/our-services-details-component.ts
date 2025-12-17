import { Component, EventEmitter, Input, Output } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { OurServices } from '../../../../shared/models/interface';
import { ModalComponent } from '../../../../shared/components/modal/modal.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-our-services-details-component',
  imports: [CommonModule, ModalComponent],
  templateUrl: './our-services-details-component.html',
})

export class OurServicesDetailsComponent {
  @Input() isOpen!: boolean;
  @Input() item!: OurServices | null;
  @Output() close = new EventEmitter<void>();

  imageUrl = environment.imageUrl;

}
