import { Component, EventEmitter, Input, Output, signal } from '@angular/core';
import { HeroSection } from '../../../../shared/models/interface';
import { environment } from '../../../../../environments/environment';
import { CommonModule } from '@angular/common';
import { ModalComponent } from '../../../../shared/components/modal/modal.component';

@Component({
  selector: 'app-hero-section-detail',
  imports: [CommonModule, ModalComponent],
  templateUrl: './hero-section-detail.html',
})
export class HeroSectionDetail {
  @Input() isOpen!: boolean;
  @Input() item!: HeroSection | null;
  @Output() close = new EventEmitter<void>();

  imageUrl = environment.imageUrl;

}
