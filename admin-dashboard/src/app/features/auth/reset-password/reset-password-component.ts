import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { TokenStorageService } from '../../../core/services/token-storage.service';
import { FlashMessageService } from '../../../core/services/flash-message.service';
import { ValidateAllFormFields } from '../../../core/utils/CustomValidator';
import { InputValidationErrorMessage } from '../../../shared/components/input-validation-error-message/input-validation-error-message-component';
import { LucideAngularModule, Lock, Eye, EyeOff, Loader, ShieldCheck } from 'lucide-angular';
import { Location } from '@angular/common';

@Component({
  selector: 'app-reset-password-component',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    InputValidationErrorMessage,
    LucideAngularModule
  ],
  templateUrl: './reset-password-component.html',
})
export class ResetPasswordComponent implements OnInit {
  rForm!: FormGroup;
  isLoading = signal(false);
  isLoggedIn = computed(() => this.tokenStorage.isAuthenticated());
  token: string = '';
  showPassword: boolean = false;
  showConfirmPassword: boolean = false;

  readonly Lock = Lock;
  readonly Eye = Eye;
  readonly EyeOff = EyeOff;
  readonly Loader = Loader;
  readonly ShieldCheck = ShieldCheck;

  private fb = inject(FormBuilder);
  private auth = inject(AuthService);
  private tokenStorage = inject(TokenStorageService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private flash = inject(FlashMessageService);
  private location = inject(Location);

  ngOnInit(): void {
    if (this.tokenStorage.isAuthenticated()) {
      this.router.navigate([this.location.back()]);

      return;
    }

    this.token = this.route.snapshot.paramMap.get('token') ?? '';

    this.rForm = this.fb.group(
      {
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required]
      },
      { validators: this.passwordsMatch }
    );
  }

  passwordsMatch(form: FormGroup) {
    return form.get('password')?.value === form.get('confirmPassword')?.value
      ? null
      : { mismatch: true };
  }

  onSubmit(): void {
    if (this.rForm.invalid) {
      ValidateAllFormFields.validateAll(this.rForm);
      return;
    }

    this.isLoading.set(true);

    this.auth.resetPassword(this.token, this.rForm.value).subscribe({
      next: (res) => {
        this.isLoading.set(false);
        this.flash.show('Password reset successfully!', 'success');
        this.router.navigate(['/login']);
      },
      error: (err) => {
        this.isLoading.set(false);
        this.flash.show(err.error?.message || 'Something went wrong!', 'error');
      }
    });
  }
}
