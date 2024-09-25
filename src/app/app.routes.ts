import { Routes } from '@angular/router';
import { LogInComponent } from './shared/components/log-in/log-in.component';
import { AppComponent } from './app.component';
import { AuthGaurd } from './core/Guards/auth.guard';
import { AdminLayoutComponent } from './admin/components/admin-layout/admin-layout.component';

export const routes: Routes = [

  { 
    path: 'admin', 
    component : AdminLayoutComponent,
    canActivate: [AuthGaurd],
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule) 
  },
  { path: 'login', component: LogInComponent }, 
  { path: 'app', component: AppComponent },
  { path: '', redirectTo: '/app', pathMatch: 'full' }, // Added pathMatch to avoid unwanted redirects
  { path: '**', redirectTo: '/login' }

];
