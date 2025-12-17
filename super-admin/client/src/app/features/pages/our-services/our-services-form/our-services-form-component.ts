import { CommonModule } from '@angular/common';
import { Component, effect, inject, input, output, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToggleSwitchComponent } from '../../../../shared/components/toggle-switch/toggle-switch.component';
import { InputValidationErrorMessage } from '../../../../shared/components/input-validation-error-message/input-validation-error-message-component';
import { ImageCropperModalComponent } from '../../../../shared/components/image-cropper-modal/image-cropper-modal.component';
import { LucideAngularModule, X } from 'lucide-angular';
import { OurServices } from '../../../../shared/models/interface';
import { environment } from '../../../../../environments/environment';
import { OurServicesService } from '../../../../core/services/our-services.service';
import { FlashMessageService } from '../../../../core/services/flash-message.service';
import { ValidateAllFormFields } from '../../../../core/utils/CustomValidator';

@Component({
  selector: 'app-our-services-form-component',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ToggleSwitchComponent,
    InputValidationErrorMessage,
    ImageCropperModalComponent,
    LucideAngularModule
  ],
  templateUrl: './our-services-form-component.html',
})

export class OurServicesFormComponent {
  rForm: FormGroup;
  data = input<OurServices | null>(null);
  panelClosed = output<boolean>();
  selectedImage = signal<string>('');
  imageUrl = environment.imageUrl;

  private ourServicesService = inject(OurServicesService);
  private fb = inject(FormBuilder);
  private flashService = inject(FlashMessageService);

  readonly X = X;

  constructor() {
    this.rForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      subtitle: ['', [Validators.minLength(2), Validators.maxLength(50)]],
      description: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(500)]],
      button1_text: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      button1_url: ['', [Validators.required, Validators.pattern(/https?:\/\/.+/)]],
      button2_text: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      button2_url: ['', [Validators.required, Validators.pattern(/https?:\/\/.+/)]],
      image: ['', Validators.required],
      status: [true],
    });

    effect(() => {
      const currentData = this.data();
      if (currentData) {
        this.rForm.patchValue(currentData);

        if (currentData.image) {
          this.selectedImage.set(currentData.image);
        }
      }
    });
  }

  ngOnInit(): void {
    const currentData = this.data();
    if (currentData) {
      this.rForm.patchValue(currentData);
      if (currentData.image) {
        this.selectedImage.set(currentData.image);
      }
    }
  }

  onImageSelect(imageUrl: string | string[]): void {
    const url = Array.isArray(imageUrl) ? imageUrl[0] : imageUrl;
    this.selectedImage.set(url);
    this.rForm.patchValue({ image: url });
  }

  removeImage(): void {
    this.selectedImage.set('');
    this.rForm.patchValue({ image: '' });
  }

  closeModal(action: boolean): void {
    this.panelClosed.emit(action);
  }

  onSubmit(): void {
    if (!this.rForm.valid) {
      ValidateAllFormFields.validateAll(this.rForm);
      return;
    }

    const formData = new FormData();
    const formValue = this.rForm.value;

    Object.keys(formValue).forEach(key => {
      formData.append(key, formValue[key] ?? '');
    });

    const currentData = this.data();
    if (currentData) {
      this.ourServicesService.updateOurService(currentData.id, formData).subscribe({
        next: () => {
          this.closeModal(true);
          this.flashService.show('Our service updated successfully.', 'success');
        },
        error: (err) => {
          console.error(err);
          this.flashService.show('Failed to update our service.', 'error');
        }
      });
    } else {
      this.ourServicesService.createOurService(formData).subscribe({
        next: () => {
          this.closeModal(true);
          this.flashService.show('Our service created successfully.', 'success');
        },
        error: (err) => {
          console.error(err);
          this.flashService.show('Failed to create our service.', 'error');
        }
      });
    }
  }

  toggleStatus() {
    const current = this.rForm.controls['status'].value;
    this.rForm.controls['status'].setValue(!current);
  }
}
