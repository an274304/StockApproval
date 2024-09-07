import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },
  { path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule) },
  { path: 'director', loadChildren: () => import('./director/director.module').then(m => m.DirectorModule) },
  { path: 'accounts', loadChildren: () => import('./accounts/accounts.module').then(m => m.AccountsModule) },
  { path: '', redirectTo: 'login', pathMatch: 'full' } // Default redirect
  // { path: '**', redirectTo: '/login' } // Wildcard route for 404
];
