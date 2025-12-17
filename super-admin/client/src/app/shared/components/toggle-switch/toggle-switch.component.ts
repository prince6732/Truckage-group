import { Component, input, output, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-toggle-switch',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button
      type="button"
      [disabled]="disabled()"
      (click)="toggle()"
      [class]="
        'relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ' +
        (value ? 'bg-blue-600' : 'bg-gray-300') +
        (disabled() ? ' opacity-50 cursor-not-allowed' : ' cursor-pointer')
      "
    >
      <span
        [class]="
          'inline-block h-4 w-4 transform rounded-full bg-white transition-transform ' +
          (value ? 'translate-x-6' : 'translate-x-1')
        "
      ></span>
    </button>
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ToggleSwitchComponent),
      multi: true,
    },
  ],
})
export class ToggleSwitchComponent implements ControlValueAccessor {
  disabled = input<boolean>(false);
  value: boolean = false;

  private onChange: (value: boolean) => void = () => { };
  private onTouched: () => void = () => { };

  toggle(): void {
    if (!this.disabled()) {
      this.value = !this.value;
      this.onChange(this.value);
      this.onTouched();
    }
  }

  writeValue(value: boolean): void {
    this.value = value;
  }

  registerOnChange(fn: (value: boolean) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void { }
}
