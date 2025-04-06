import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { LoginComponent } from './app/login/login.component';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { RegisterComponent } from './app/register/register.component';
import { HomeComponent } from './app/home/home.component';

const routes = [
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'register', component:RegisterComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' as const },
];

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
  ],
}).catch((err) => console.error(err));