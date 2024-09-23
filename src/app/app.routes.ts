import { Routes } from '@angular/router';
import { LogInComponent } from './shared/components/log-in/log-in.component';
import { AppComponent } from './app.component';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },  // Default route
  { path: 'login', component: LogInComponent },  // Login page
  { path: 'app', component: AppComponent },  
  { 
    path: 'admin', 
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule) 
  },
  { 
    path: 'director', 
    loadChildren: () => import('./director/director.module').then(m => m.DirectorModule) 
  },
  { 
    path: 'account', 
    loadChildren: () => import('./accounts/accounts.module').then(m => m.AccountsModule) 
  },
  // Wildcard route for handling unknown URLs (redirect to login)
  { path: '**', redirectTo: '/login' }
];
