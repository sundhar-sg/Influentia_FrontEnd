import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginAuthService } from '../service/login-auth.service';

@Injectable({
  providedIn: 'root'
})
export class AppauthGuard implements CanActivate {

    constructor(private authToken: LoginAuthService, private router: Router) {}

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        
            const currentUser: any = this.authToken.getToken();

            if(!currentUser) {
                this.router.navigate(["/login"]);
                return false;
            }

            const allowedRoles: string[] = ['User'];
            const userRole: any[] = currentUser.assignedRoles;

            // for(let i = 0; i < userRole.length; i++) {
            //     console.log(userRole[i].name);
            // }

            let hasAllowedRole = userRole.some(role => allowedRoles.includes(role.name));

            if(!hasAllowedRole) {
                this.router.navigate([""]);
            }

            return true;
    }
}