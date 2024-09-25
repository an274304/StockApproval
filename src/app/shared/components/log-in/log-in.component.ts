import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { GlobalStateService } from '../../services/global-state.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-log-in',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit, AfterViewInit {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private globalState: GlobalStateService
  ) {
    this.loginForm = this.fb.group({
      email: '',
      password: '',
      isRemember: false
    });
  }

  ngOnInit(): void {
   
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const { email, password, isRemember } = this.loginForm.value;
      this.authService.LogIn(email, password, isRemember).subscribe({
        next: (response) => {
          this.globalState.setToken(response.token);
          this.globalState.setUserName(response.userName);
          this.globalState.setUserId(response.userId);
          this.globalState.setUserRole(response.userRole);
          this.globalState.setIsAuthenticated('true');
          this.redirectBasedOnRole();
        },
        error: () => {
          alert('Wrong Credentials...');
        }
      });
    }
  }

  redirectBasedOnRole(): void {
    const userRole = this.globalState.getUserRole();

    if (userRole === 'admin') {
      this.router.navigate(['/admin']);
    } else if (userRole === 'director') {
      this.router.navigate(['/director']);
    } else if (userRole === 'account') {
      this.router.navigate(['/accounts']);
    }
  }

  ngAfterViewInit(): void {
    // Optional: Your jQuery-based password visibility toggle
  }
}
