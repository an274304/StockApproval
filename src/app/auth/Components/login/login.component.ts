import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  role: string = 'admin'; // This should be bound to a form input

  constructor(private router: Router) {}

  login() {

    debugger;

    // Simulate a login by setting a role
    if (this.role === 'admin') {
      this.router.navigate(['/admin/dashboard']);
    } else if (this.role === 'director') {
      this.router.navigate(['/director/dashboard']);
    } else if (this.role === 'accounts') {
      this.router.navigate(['/accounts/dashboard']);
    } else {
      alert('Invalid role');
    }
  }
}
