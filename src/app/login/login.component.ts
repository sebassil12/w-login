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
// Establish parameters that will be used in the login form
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
      // Call the login method from AuthService that receives the username and password
      const { username, password } = this.loginForm.value as { username: string; password: string };
      this.authService.login(username, password).subscribe({
        next: (response) => {
          this.authService.setToken(response.access) //The token stored in local storage, the name of data is 'access'
          const storedToken = this.authService.getToken();
          if (storedToken){
            this.router.navigate(['/home']); // Redirect to home page
          } else{
            console.log('Failed to store authentication token');
            this.errorMessage = 'Failed to store authentication token';
          }
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
