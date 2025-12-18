import { AbstractControl, FormControl, FormGroup, FormArray, ValidationErrors } from '@angular/forms';

export class CustomValidator {
  static numeric(control: AbstractControl): ValidationErrors | null {
    const value = control.value;

    if (value === null || value === '') return null;

    const isValid = /^[0-9]+(\.[0-9]+)?$/.test(value.toString());

    return isValid ? null : { invalidNumber: true };
  }
}

export class ValidateAllFormFields {

  static validateAll(formGroup: FormGroup | FormArray): void {
    Object.keys(formGroup.controls).forEach(key => {
      const control = formGroup.get(key);

      if (control instanceof FormControl) {
        control.markAsTouched();
        control.updateValueAndValidity();
      }
      else if (control instanceof FormGroup || control instanceof FormArray) {
        this.validateAll(control);
      }
    });
  }
}
