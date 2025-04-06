import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { LoginComponent } from './app/login/login.component';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { RegisterComponent } from './app/register/register.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

const routes = [
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: LoginComponent },
  { path: 'register', component:RegisterComponent }, // Placeholder (replace with real dashboard later)
  { path: '', redirectTo: '/login', pathMatch: 'full' as const },
];

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
  ],
}).catch((err) => console.error(err));