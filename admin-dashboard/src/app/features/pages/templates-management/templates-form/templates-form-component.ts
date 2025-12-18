import { CommonModule } from '@angular/common';
import { Component, effect, inject, input, output, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToggleSwitchComponent } from '../../../../shared/components/toggle-switch/toggle-switch.component';
import { InputValidationErrorMessage } from '../../../../shared/components/input-validation-error-message/input-validation-error-message-component';
import { ImageCropperModalComponent } from '../../../../shared/components/image-cropper-modal/image-cropper-modal.component';
import { LucideAngularModule, X } from 'lucide-angular';
import { Templates } from '../../../../shared/models/interface';
import { environment } from '../../../../../environments/environment';
import { TemplatesService } from '../../../../core/services/templates.service';
import { FlashMessageService } from '../../../../core/services/flash-message.service';
import { ValidateAllFormFields } from '../../../../core/utils/CustomValidator';

@Component({
  selector: 'app-templates-form-component',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ToggleSwitchComponent,
    InputValidationErrorMessage,
    ImageCropperModalComponent,
    LucideAngularModule
  ],
  templateUrl: './templates-form-component.html',
})

export class TemplatesFormComponent {
  rForm: FormGroup;
  data = input<Templates | null>(null);
  panelClosed = output<boolean>();
  selectedImage = signal<string>('');
  imageUrl = environment.imageUrl;

  additionalImages = signal<string[]>([]);

  private templatesService = inject(TemplatesService);
  private fb = inject(FormBuilder);
  private flashService = inject(FlashMessageService);

  readonly X = X;

  constructor() {
    this.rForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      description: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(500)]],
      button1_text: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      button1_url: ['', [Validators.required, Validators.pattern(/https?:\/\/.+/)]],
      button2_text: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      button2_url: ['', [Validators.required, Validators.pattern(/https?:\/\/.+/)]],
      image: ['', Validators.required],
      additional_images: [[], Validators.required],
      status: [true],
    });

   effect(() => {
      const currentData = this.data();
      if (currentData) {
        this.rForm.patchValue({
          title: currentData.title,
          description: currentData.description,
          button1_text: currentData.button1_text,
          button1_url: currentData.button1_url,
          button2_text: currentData.button2_text,
          button2_url: currentData.button2_url,
          image: currentData.image ?? '',
          status: currentData.status ?? true
        });

        if (currentData.image) {
          this.selectedImage.set(currentData.image);
        }

        if (currentData.additional_images) {
          const additionalImagesValue: string[] | string = currentData.additional_images as any;
          let arr: string[] = [];
          
          if (Array.isArray(additionalImagesValue)) {
            arr = additionalImagesValue;
          } else if (typeof additionalImagesValue === 'string') {
            arr = additionalImagesValue.split(',').map(img => img.trim()).filter(img => img);
          }
          
          this.additionalImages.set(arr);
          this.rForm.patchValue({ additional_images: arr });
        } else {
          this.additionalImages.set([]);
          this.rForm.patchValue({ additional_images: [] });
        }
      }
    });
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

  onAdditionalImagesSelect(imgs: string[] | string): void {
    const selected = Array.isArray(imgs) ? imgs : [imgs];
    const updatedList = [...this.additionalImages(), ...selected];
    this.additionalImages.set(updatedList);
    this.rForm.patchValue({ additional_images: updatedList });
  }

  removeAdditionalImage(index: number): void {
    const updated = this.additionalImages().filter((_, i) => i !== index);
    this.additionalImages.set(updated);
    this.rForm.patchValue({ additional_images: updated });
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
      if (key === 'additional_images') {
        const images = formValue[key] || [];
        formData.append(key, JSON.stringify(images));
      } else {
        formData.append(key, formValue[key] ?? '');
      }
    });

    const currentData = this.data();
    if (currentData) {
      this.templatesService.updateTemplate(currentData.id, formData).subscribe({
        next: () => {
          this.closeModal(true);
          this.flashService.show('Template updated successfully.', 'success');
        },
        error: (err) => {
          console.error(err);
          this.flashService.show('Failed to update template.', 'error');
        }
      });
    } else {
      this.templatesService.createTemplate(formData).subscribe({
        next: () => {
          this.closeModal(true);
          this.flashService.show('Template created successfully.', 'success');
        },
        error: (err) => {
          console.error(err);
          this.flashService.show('Failed to create template.', 'error');
        }
      });
    }
  }

  toggleStatus() {
    const current = this.rForm.controls['status'].value;
    this.rForm.controls['status'].setValue(!current);
  }
}
