import { CommonModule } from '@angular/common';
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { FormGroup, ReactiveFormsModule, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {

  loginForm = new FormGroup({
    username: new FormControl('', {
      validators: [Validators.required],
      updateOn: 'blur',
    }),
    password: new FormControl('', {
      validators: [Validators.required],
      updateOn: 'blur',
    }),
  });

  loading = false;
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) {}
  onSubmit() {
    if (this.loginForm.valid) {
      this.loading = true;
      this.errorMessage = '';

      const { username, password } = this.loginForm.value as { username: string; password: string };
      this.authService.login(username, password).subscribe({
        next: (response) => {
          localStorage.setItem('token', response.token); // Store token
          this.router.navigate(['/dashboard']); // Redirect
          this.loading = false;
        },
        error: (err) => {
          this.errorMessage = err.message || 'Login failed';
          this.loading = false;
        },
      });
    }
  }
}
