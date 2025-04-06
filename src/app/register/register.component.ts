import { CommonModule } from '@angular/common';
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { FormGroup, ReactiveFormsModule, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterComponent {

  loginForm = new FormGroup({
    name: new FormControl('', {
      validators: [Validators.required],
      updateOn: 'blur',
    }),
    username: new FormControl('', {
      validators: [Validators.required],
      updateOn: 'blur',
    }),
    password: new FormControl('', {
      validators: [Validators.required],
      updateOn: 'blur',
    }),
    email: new FormControl('', {
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
    
    }
  }
}
