import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { LucideAngularModule, Mail, Lock, Eye, EyeOff, ShieldCheck, Loader } from 'lucide-angular';
import { AuthService } from '../../../core/services/auth.service';
import { TokenStorageService } from '../../../core/services/token-storage.service';
import { ValidateAllFormFields } from '../../../core/utils/CustomValidator';
import { FlashMessageService } from '../../../core/services/flash-message.service';
import { InputValidationErrorMessage } from "../../../shared/components/input-validation-error-message/input-validation-error-message-component";

@Component({
  selector: 'app-login-component',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    LucideAngularModule,
    InputValidationErrorMessage,
    RouterLink
  ],
  templateUrl: './login-component.html'
})
export class LoginComponent implements OnInit {
  readonly Mail = Mail;
  readonly Lock = Lock;
  readonly Eye = Eye;
  readonly EyeOff = EyeOff;
  readonly ShieldCheck = ShieldCheck;
  readonly Loader = Loader;

  isLoading = signal(false);
  isLoggedIn = computed(() => this.tokenStorageService.isAuthenticated())
  showPasswordState = signal(false);

  rForm!: FormGroup;

  redirectTo: string = '/';

  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private tokenStorageService = inject(TokenStorageService);
  private flashService = inject(FlashMessageService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private location = inject(Location);

  ngOnInit(): void {
    if (this.tokenStorageService.isAuthenticated()) {
      this.router.navigate([this.location.back()]);
      return;
    }
    this.rForm = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });

    this.redirectTo = this.route.snapshot.queryParamMap.get('redirectTo') || '/';
  }

  togglePasswordVisibility() {
    this.showPasswordState.update(v => !v);
  }

  onLoginSuccess() {
    const user = this.tokenStorageService.user();

    if (user?.role === 'ADMIN') {
      if (this.redirectTo && this.redirectTo !== '/') {
        return this.router.navigateByUrl(this.redirectTo);
      }
      return this.router.navigate(['/']);
    }

    if (this.redirectTo && this.redirectTo !== '/') {
      return this.router.navigateByUrl(this.redirectTo);
    }

    return this.router.navigate(['/']);
  }

  onSubmit(): void {
    if (this.rForm.invalid) {
      ValidateAllFormFields.validateAll(this.rForm);
      return;
    }

    this.isLoading.set(true);

    this.authService.login(this.rForm.value).subscribe({
      next: (response) => {
        this.isLoading.set(false);

        if (response.accessToken) {
          this.tokenStorageService.saveToken(response.accessToken);
          this.tokenStorageService.saveUser(response.user);

          this.flashService.show('Welcome Back!', 'success');

          this.onLoginSuccess();
        }
      },

      error: (err) => {
        this.isLoading.set(false);
        this.flashService.show(err.error?.message || 'Login failed.', 'error');
      }
    });
  }
}
