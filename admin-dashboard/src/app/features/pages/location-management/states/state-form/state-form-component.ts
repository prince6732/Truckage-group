import { CommonModule } from '@angular/common';
import { Component, input, output, OnInit, effect, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { State } from '../../../../../shared/models/interface';
import { StateService } from '../../../../../core/services/state.service';
import { ValidateAllFormFields } from '../../../../../core/utils/CustomValidator';
import { ToggleSwitchComponent } from '../../../../../shared/components/toggle-switch/toggle-switch.component';
import { FlashMessageService } from '../../../../../core/services/flash-message.service';
import { InputValidationErrorMessage } from "../../../../../shared/components/input-validation-error-message/input-validation-error-message-component";

@Component({
  selector: 'app-state-form-component',
  imports: [CommonModule, ReactiveFormsModule, ToggleSwitchComponent, InputValidationErrorMessage],
  templateUrl: './state-form-component.html',
  standalone: true,
})
export class StateFormComponent implements OnInit {
  rForm: FormGroup;
  data = input<State | null>(null);
  panelClosed = output<boolean>();

  private flashService = inject(FlashMessageService);
  private fb = inject(FormBuilder);
  private stateService = inject(StateService);

  constructor() {
    this.rForm = this.fb.group({
      name: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(50),
        ]),
      ],
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
    if (this.rForm.valid) {
      const formData = this.rForm.value;
      const currentData = this.data();
      if (currentData) {
        this.stateService.updateState(currentData.id, formData).subscribe({
          next: () => {
            this.closeModal(true);
            this.flashService.show('State updated successfully.', "success");
          },
          error: (err) => {
            console.log(err),
              this.flashService.show('Failed to update state.', "error");
          },
        });
      } else {
        this.stateService.createState(formData).subscribe({
          next: () => {
            this.closeModal(true);
            this.flashService.show('State created successfully.', "success");
          },
          error: (err) => {
            console.log(err);
            this.flashService.show('Failed to create state.', "error");
          },
        });
      }
    } else {
      ValidateAllFormFields.validateAll(this.rForm);
    }
  }

  toggleStatus() {
    const current = this.rForm.controls['status'].value;
    this.rForm.controls['status'].setValue(!current);
  }

}
