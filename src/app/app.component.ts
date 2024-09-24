import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalStateService } from './shared/services/global-state.service';
import { AdminNavBarComponent } from './shared/components/admin-nav-bar/admin-nav-bar.component';
import { DirectorNavBarComponent } from './shared/components/director-nav-bar/director-nav-bar.component';
import { AccountNavBarComponent } from './shared/components/account-nav-bar/account-nav-bar.component';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { AuthService } from './shared/services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, AdminNavBarComponent, DirectorNavBarComponent, AccountNavBarComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'Stock Approval';
  userRole: string | null = null;

  constructor(private globalState: GlobalStateService, private router: Router, private authService : AuthService) {
   
  }

  ngOnInit(): void {
    this.userRole = this.globalState.getUserRole();
    // this.authService.user$.subscribe(user => {
    //   this.userRole = user;
      
    // });

  }

  ngAfterViewInit(): void {
   
  }

  logOut(): void {
    this.globalState.clear();  // Clear global state
    this.router.navigate(['/login']);  // Redirect to login
    this.userRole ='';
    this.authService.Logout();
  }
}
