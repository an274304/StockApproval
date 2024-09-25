import { Injectable } from "@angular/core";
import { CanActivate, Router} from "@angular/router";
import { AuthService } from "../shared/services/auth.service";
import { GlobalStateService } from "../shared/services/global-state.service";

@Injectable({providedIn:"root"})
export class AuthGaurd implements CanActivate{
constructor(private authService : AuthService, private globalState: GlobalStateService, private router: Router){}

canActivate():boolean {

     if (this.globalState.getIsAuthenticated())
    {
        return true;
    }
    else 
    {
        this.router.navigate(['/login']);
        return false;
    }

    // if (this.authService.isAuthenticated())
    // {
    //     return true;
    // }
    // else 
    // {
    //     this.router.navigate(['/login']);
    //     return false;
    // }
}
}