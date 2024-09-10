import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AdminNavBarComponent } from "./shared/components/admin-nav-bar/admin-nav-bar.component";
import { DirectorNavBarComponent } from "./shared/components/director-nav-bar/director-nav-bar.component";
import { AccountNavBarComponent } from "./shared/components/account-nav-bar/account-nav-bar.component";
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AdminNavBarComponent, DirectorNavBarComponent, AccountNavBarComponent,CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'App';
  userRole: string | null = null;
  router = inject(Router);
  constructor() {}

  ngOnInit(): void {
    // Get user role from AuthService
    this.userRole = 'admin';
    //this.router.navigateByUrl('/admin');
  }
}
