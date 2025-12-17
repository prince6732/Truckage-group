import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { AbstractControl, ValidationErrors } from '@angular/forms';

@Component({
  selector: 'input-validation-error-message',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './input-validation-error-message-component.html',
})
export class InputValidationErrorMessage {
  @Input() control: AbstractControl | null = null;
  @Input() fieldName: string = 'This field';
  @Input() patternMessage: string | null = null;

  get errors(): ValidationErrors | null {
    return this.control?.errors ?? null;
  }

  get minLength(): number | null {
    return this.errors?.['minlength']?.requiredLength ?? null;
  }

  get maxLength(): number | null {
    return this.errors?.['maxlength']?.requiredLength ?? null;
  }
}
