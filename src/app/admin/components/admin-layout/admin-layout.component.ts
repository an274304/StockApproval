import { AfterViewInit, Component } from '@angular/core';
import { GlobalStateService } from '../../../shared/services/global-state.service';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../shared/services/auth.service';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [CommonModule,RouterOutlet,RouterLink],
  templateUrl: './admin-layout.component.html',
  styleUrl: './admin-layout.component.css'
})
export class AdminLayoutComponent implements AfterViewInit {
  
  constructor(private globalState: GlobalStateService, private router: Router, private authService : AuthService) {
   
  }

  logOut(): void {
    this.globalState.clear();  // Clear global state
    this.router.navigate(['/login']);  // Redirect to login
  }

  ngAfterViewInit(): void {
    $('#sidenav').metisMenu();

    $(".btn-toggle").click(function () {
      $("body").hasClass("toggled") ? ($("body").removeClass("toggled"), $(".sidebar-wrapper").unbind("hover")) : ($("body").addClass("toggled"), $(".sidebar-wrapper").hover(function () {
        $("body").addClass("sidebar-hovered")
      }, function () {
        $("body").removeClass("sidebar-hovered")
      }))
    })
  
  }
}
