import { Component } from '@angular/core';
import { AuthTokenService } from '../shared/auth-token.service';
import { LoginAuthService } from '../service/login-auth.service';
import jwtDecode from 'jwt-decode';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

    constructor(public sharedService: AuthTokenService, public loginAuth: LoginAuthService) {}
}
