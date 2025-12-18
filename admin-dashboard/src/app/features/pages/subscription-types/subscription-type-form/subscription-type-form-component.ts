import { CommonModule } from '@angular/common';
import { Component, input, output, OnInit, effect, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SubscriptionTypes } from '../../../../shared/models/interface';
import { SubscriptionTypesService } from '../../../../core/services/subscription-types.service';
import { ValidateAllFormFields } from '../../../../core/utils/CustomValidator';
import { ToggleSwitchComponent } from '../../../../shared/components/toggle-switch/toggle-switch.component';
import { FlashMessageService } from '../../../../core/services/flash-message.service';
import { InputValidationErrorMessage } from "../../../../shared/components/input-validation-error-message/input-validation-error-message-component";

@Component({
  selector: 'app-subscription-type-form-component',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ToggleSwitchComponent,
    InputValidationErrorMessage
  ],
  templateUrl: './subscription-type-form-component.html',
  standalone: true,
})

export class SubscriptionTypeFormComponent implements OnInit {
  rForm: FormGroup;
  data = input<SubscriptionTypes | null>(null);
  panelClosed = output<boolean>();

  private subscriptionTypesService = inject(SubscriptionTypesService);
  private fb = inject(FormBuilder);
  private flashService = inject(FlashMessageService);

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
      price: ['', Validators.compose([Validators.required, Validators.min(1)])],
      duration: ['', Validators.compose([Validators.required])],
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
        this.subscriptionTypesService
          .updateSubscriptionType(currentData.id, formData)
          .subscribe({
            next: () => {
              this.closeModal(true);
              this.flashService.show('Subscription type updated successfully.', "success");
            },
            error: (err) => {
              console.log(err);
              this.flashService.show('Failed to update subscription type.', "error");
            },
          });
      } else {
        this.subscriptionTypesService
          .createSubscriptionType(formData)
          .subscribe({
            next: () => {
              this.closeModal(true);
              this.flashService.show('Subscription type created successfully.', "success");
            },
            error: (err) => {
              console.log(err);
              this.flashService.show('Failed to create subscription type.', "error");
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
