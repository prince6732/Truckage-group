import { Component, effect, inject, input, output } from '@angular/core';
import { ToggleSwitchComponent } from '../../../../shared/components/toggle-switch/toggle-switch.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Settings } from '../../../../shared/models/interface';
import { FlashMessageService } from '../../../../core/services/flash-message.service';
import { SettingsService } from '../../../../core/services/settings.service';
import { ValidateAllFormFields } from '../../../../core/utils/CustomValidator';
import { InputValidationErrorMessage } from '../../../../shared/components/input-validation-error-message/input-validation-error-message-component';

@Component({
  selector: 'app-setting-form-component',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ToggleSwitchComponent,
    InputValidationErrorMessage
  ],
  templateUrl: './setting-form-component.html',
})

export class SettingFormComponent {
  rForm: FormGroup;
  data = input<Settings | null>(null);
  panelClosed = output<boolean>();

  private flashService = inject(FlashMessageService);
  private fb = inject(FormBuilder);
  private settingsService = inject(SettingsService);

  constructor() {
    this.rForm = this.fb.group({
      key: ['', Validators.compose([Validators.pattern('^[a-zA-Z0-9_.-]+$'), Validators.required])],
      value: ['', Validators.compose([Validators.pattern('^[a-zA-Z0-9 _.,@:/()%-]*$'), Validators.required])],
      status: [false],
    });

    effect(() => {
      const currentData = this.data();
      if (currentData) {
        this.rForm.patchValue(currentData);
      }
    });
  }

  ngOnInit(): void {
    if (this.data()) {
      this.rForm.patchValue(this.data()!);
    }
  }

  closeModal(action: boolean): void {
    this.panelClosed.emit(action);
  }

  onSubmit(): void {
    if (!this.rForm.valid) return ValidateAllFormFields.validateAll(this.rForm);

    const formData = this.rForm.value;
    const currentData = this.data();
    const request = currentData
      ? this.settingsService.updateSetting(currentData.key, formData)
      : this.settingsService.createSetting(formData);

    request.subscribe({
      next: () => {
        this.closeModal(true);
        this.flashService.show(
          `Setting ${currentData ? 'updated' : 'created'} successfully.`,
          "success"
        );
      },
      error: (err) => {
        console.log(err);
        this.flashService.show(
          `Failed to ${currentData ? 'update' : 'create'} setting.`,
          "error"
        );
      },
    });
  }

  toggleStatus() {
    const current = this.rForm.controls['status'].value;
    this.rForm.controls['status'].setValue(!current);
  }
}
