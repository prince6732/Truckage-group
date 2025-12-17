import { CommonModule } from '@angular/common';
import { Component, input, output, OnInit, effect, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { City } from '../../../../../shared/models/interface';
import { StateCitiesService } from '../../../../../core/services/state-cities.service';
import { ActivatedRoute } from '@angular/router';
import { ValidateAllFormFields } from '../../../../../core/utils/CustomValidator';
import { ToggleSwitchComponent } from '../../../../../shared/components/toggle-switch/toggle-switch.component';
import { FlashMessageService } from '../../../../../core/services/flash-message.service';
import { InputValidationErrorMessage } from "../../../../../shared/components/input-validation-error-message/input-validation-error-message-component";

@Component({
  selector: 'app-cities-form-component',
  imports: [CommonModule, ReactiveFormsModule, ToggleSwitchComponent, InputValidationErrorMessage],
  templateUrl: './cities-form-component.html',
  standalone: true,
})

export class CitiesFormComponent implements OnInit {
  rForm: FormGroup;
  state_id!: number;
  data = input<City | null>(null);
  panelClosed = output<boolean>();

  private flashService = inject(FlashMessageService);
  private fb = inject(FormBuilder);
  private citiesService = inject(StateCitiesService);
  private route = inject(ActivatedRoute);

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
      pincode: [
        '',
        Validators.compose([
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
    this.state_id = Number(this.route.snapshot.paramMap.get('state_id'));
  }

  closeModal(action: boolean): void {
    this.panelClosed.emit(action);
  }

  onSubmit(): void {
    if (!this.rForm.valid) return ValidateAllFormFields.validateAll(this.rForm);

    const formData = this.rForm.value;
    const currentData = this.data();
    const request = currentData
      ? this.citiesService.updateCity(currentData.id, formData)
      : this.citiesService.createCity(this.state_id, formData);

    request.subscribe({
      next: () => {
        this.closeModal(true);
        this.flashService.show(
          `City ${currentData ? 'updated' : 'created'} successfully.`,
          "success"
        );
      },
      error: (err) => {
        console.log(err);
        this.flashService.show(
          `Failed to ${currentData ? 'update' : 'create'} city.`,
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
