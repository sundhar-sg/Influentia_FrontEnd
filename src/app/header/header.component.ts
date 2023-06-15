import { Component } from '@angular/core';
import { LoginAuthService } from '../service/login-auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

    constructor(public loginAuth: LoginAuthService) {
    }
}
