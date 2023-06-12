import { Injectable } from '@angular/core';
import { LoginAuthService } from '../service/login-auth.service';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthguardService {

    constructor(private authService: LoginAuthService, private router: Router) { }

    canActivateFn = (route: ActivatedRouteSnapshot, state:RouterStateSnapshot) => {
        return this.checkLogin(state.url);
    }

    private checkLogin(url: string): boolean {
        if(this.authService.isLoggedIn()) {
            return true;
        } else {
            this.router.navigate(['/login'], { queryParams: { returnUrl: url } });
            return false;
        }
    }
}