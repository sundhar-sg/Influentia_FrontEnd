import { Component } from '@angular/core';
import { LoginComponent } from '../login/login.component';
import { AuthTokenService } from '../shared/auth-token.service';
import { share } from 'rxjs';
import { LoginAuthService } from '../service/login-auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

    constructor(public sharedService: AuthTokenService, public loginAuth: LoginAuthService) {}
}
